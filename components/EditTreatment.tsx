import { useNavigation, useRoute } from '@react-navigation/native'
import TreatmentForm from './TreatmentForm'
import { useCallback, useContext, useEffect } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import { DataContext } from '../contexts/DataContext'
import { TreatmentRequest } from '../modals/Treatment'
import { DeviceEventEmitter } from 'react-native'
import MainView from './MainView'
import DeleteButton from './DeleteButton'

export default function EditTreatment() {
  const navigation = useNavigation<RootStackScreenProps<'EditTreatment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditTreatment'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const treatmentId = route.params.treatmentId
  const treatment = context.treatments?.find((t) => t.id === treatmentId)
  const patient = context.patients?.find((p) => p.id === treatment?.patient_id)

  const handleTreatmentSave = useCallback(async (treatment: TreatmentRequest) => {
    await context.updateTreatment(treatment)

    navigation.goBack()
  }, [])

  useEffect(() => {
    const treatmentSaveListener = DeviceEventEmitter.addListener('treatmentSaved', handleTreatmentSave)
    const treatmentDeleteListener = DeviceEventEmitter.addListener('entityDeleted', handleDelete)

    return () => {
      treatmentSaveListener.remove()
      treatmentDeleteListener.remove()
    }
  }, [])

  const handleDelete = useCallback(async () => {
    if (patient) {
      await context.deleteTreatment(treatmentId)

      navigation.navigate('Patient', { patientId: patient.id })
    }
  }, [])

  return (
    <MainView>
      <TreatmentForm pageName='EditTreatment' treatment={treatment} />
      <DeleteButton />
    </MainView>
  )
}
