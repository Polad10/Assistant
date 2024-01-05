import { useNavigation, useRoute } from '@react-navigation/native'
import TreatmentForm from './TreatmentForm'
import { RootStackScreenProps } from '../types/Navigation'
import { useCallback, useContext, useEffect } from 'react'
import { DataContext } from '../contexts/DataContext'
import { TreatmentRequest } from '../modals/Treatment'
import { DeviceEventEmitter } from 'react-native'
import { showSuccessMessage } from '../helpers/ToastHelper'

export default function NewTreatment() {
  const navigation = useNavigation<RootStackScreenProps<'NewTreatment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewTreatment'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const handleTreatmentSave = useCallback(async (treatment: TreatmentRequest) => {
    const newTreatment = await context.createTreatment(treatment)
    showSuccessMessage('Treatment added')

    if (DeviceEventEmitter.listenerCount('treatmentCreated') > 0) {
      DeviceEventEmitter.emit('treatmentCreated', newTreatment)
    } else {
      navigation.goBack()
    }
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('treatmentSaved', handleTreatmentSave)

    return () => {
      listener.remove()
    }
  }, [])

  return <TreatmentForm pageName='NewTreatment' patient={route.params?.patient} />
}
