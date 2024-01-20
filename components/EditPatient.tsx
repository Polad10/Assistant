import { useCallback, useContext, useEffect, useState } from 'react'
import PatientForm from './PatientForm'
import { DeviceEventEmitter } from 'react-native'
import { PatientRequest } from '../modals/Patient'
import { DataContext } from '../contexts/DataContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import DeleteButton from './DeleteButton'
import { showDangerMessage, showMessage } from '../helpers/ToastHelper'
import LoadingView from './LoadingView'

export default function EditPatient() {
  const navigation = useNavigation<RootStackScreenProps<'EditPatient'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditPatient'>['route']>()
  const context = useContext(DataContext)!

  const [loading, setLoading] = useState(false)

  const patientId = route.params.patientId
  const patient = context.patients?.find((p) => p.id === patientId)

  const handlePatientSave = useCallback(async (patient: PatientRequest) => {
    setLoading(true)
    await context.updatePatient(patient)
    setLoading(false)

    showMessage('Saved')
    navigation.goBack()
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
    setLoading(true)
    await context.deletePatient(patientId)
    setLoading(false)

    showDangerMessage('Patient deleted')
    navigation.popToTop()
  }, [])

  return (
    <MainView>
      <PatientForm patient={patient} pageName='EditPatient' />
      <DeleteButton />
      {loading && <LoadingView />}
    </MainView>
  )
}
