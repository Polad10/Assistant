import { useNavigation, useRoute } from '@react-navigation/native'
import TreatmentForm from './TreatmentForm'
import { RootStackScreenProps } from '../types/Navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { TreatmentRequest } from '../modals/Treatment'
import { DeviceEventEmitter } from 'react-native'
import { showSuccessMessage } from '../helpers/ToastHelper'
import MainView from './MainView'
import LoadingView from './LoadingView'

export default function NewTreatment() {
  const navigation = useNavigation<RootStackScreenProps<'NewTreatment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewTreatment'>['route']>()
  const context = useContext(DataContext)!

  const [loading, setLoading] = useState(false)

  const handleTreatmentSave = useCallback(async (treatment: TreatmentRequest) => {
    setLoading(true)
    const newTreatment = await context.createTreatment(treatment)
    setLoading(false)

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

  return (
    <MainView>
      <TreatmentForm pageName='NewTreatment' patient={route.params?.patient} />
      {loading && <LoadingView />}
    </MainView>
  )
}
