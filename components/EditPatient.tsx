import { useCallback, useContext, useEffect } from 'react'
import PatientForm from './PatientForm'
import { DeviceEventEmitter } from 'react-native'
import { PatientRequest } from '@polad10/assistant-models/Patient'
import { DataContext } from '../contexts/DataContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import DeleteButton from './DeleteButton'

export default function EditPatient() {
  const navigation = useNavigation<RootStackScreenProps<'EditPatient'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditPatient'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const patientId = route.params.patientId
  const patient = context.patients?.find((p) => p.id === patientId)

  const handlePatientSave = useCallback(async (patient: PatientRequest) => {
    await context.updatePatient(patient)

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
    await context.deletePatient(patientId)

    navigation.popToTop()
  }, [])

  return (
    <MainView>
      <PatientForm patient={patient} pageName='EditPatient' />
      <DeleteButton />
    </MainView>
  )
}
