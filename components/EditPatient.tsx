import { useCallback, useContext, useEffect, useState } from 'react'
import PatientForm from './PatientForm'
import { DeviceEventEmitter } from 'react-native'
import { PatientRequest } from '../models/Patient'
import { DataContext } from '../contexts/DataContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import DeleteButton from './DeleteButton'
import LoadingView from './LoadingView'
import Error from './user-messages/Error'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ToastContext } from '../contexts/ToastContext'

export default function EditPatient() {
  const navigation = useNavigation<RootStackScreenProps<'EditPatient'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditPatient'>['route']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const patientId = route.params.patientId
  const patient = dataContext.patients?.find((p) => p.id === patientId)

  const handlePatientSave = useCallback(async (patient: PatientRequest) => {
    try {
      setLoading(true)
      await dataContext.updatePatient(patient)

      toast.showMessage(translator.translate('saved'))
      navigation.goBack()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const patientSaveListener = DeviceEventEmitter.addListener('patientSaved', handlePatientSave)
    const patientDeleteListener = DeviceEventEmitter.addListener('entityDeleted', handleDelete)

    return () => {
      patientSaveListener.remove()
      patientDeleteListener.remove()
    }
  }, [])

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true)
      await dataContext.deletePatient(patientId)

      toast.showDangerMessage(translator.translate('patientDeleted'))
      navigation.popToTop()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <MainView>
      <PatientForm patient={patient} pageName='EditPatient' />
      <DeleteButton />
      {loading && <LoadingView />}
      {error && <Error onBtnPress={() => setError(false)} />}
    </MainView>
  )
}
