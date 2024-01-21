import { useCallback, useContext, useEffect, useState } from 'react'
import PatientForm from './PatientForm'
import { DeviceEventEmitter } from 'react-native'
import { PatientRequest } from '../modals/Patient'
import { DataContext } from '../contexts/DataContext'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import { showSuccessMessage } from '../helpers/ToastHelper'
import MainView from './MainView'
import LoadingView from './LoadingView'
import Error from './Error'

export default function NewPatient() {
  const navigation = useNavigation<RootStackScreenProps<'NewPatient'>['navigation']>()
  const context = useContext(DataContext)!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handlePatientSave = useCallback(async (patient: PatientRequest) => {
    try {
      setLoading(true)
      const newPatient = await context.createPatient(patient)

      showSuccessMessage('Patient added')

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
