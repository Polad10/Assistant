import { useCallback, useContext, useEffect, useState } from 'react'
import PatientForm from './PatientForm'
import { DeviceEventEmitter } from 'react-native'
import { PatientRequest } from '../models/Patient'
import { DataContext } from '../contexts/DataContext'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import LoadingView from './LoadingView'
import Error from './user-messages/Error'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ToastContext } from '../contexts/ToastContext'

export default function NewPatient() {
  const navigation = useNavigation<RootStackScreenProps<'NewPatient'>['navigation']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handlePatientSave = useCallback(async (patient: PatientRequest) => {
    try {
      setLoading(true)
      const newPatient = await dataContext.createPatient(patient)

      toast.showSuccessMessage(translator.translate('patientAdded'))

      if (DeviceEventEmitter.listenerCount('patientCreated') > 0) {
        DeviceEventEmitter.emit('patientCreated', newPatient)
      } else {
        navigation.goBack()
      }
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('patientSaved', handlePatientSave)

    return () => {
      listener.remove()
    }
  }, [])

  return (
    <MainView>
      <PatientForm pageName='NewPatient' />
      {loading && <LoadingView />}
      {error && <Error onBtnPress={() => setError(false)} />}
    </MainView>
  )
}
