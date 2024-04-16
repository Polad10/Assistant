import { useNavigation, useRoute } from '@react-navigation/native'
import TreatmentForm from './TreatmentForm'
import { RootStackScreenProps } from '../types/Navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { TreatmentRequest } from '../models/Treatment'
import { DeviceEventEmitter } from 'react-native'
import MainView from './MainView'
import LoadingView from './LoadingView'
import Error from './user-messages/Error'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ToastContext } from '../contexts/ToastContext'

export default function NewTreatment() {
  const navigation = useNavigation<RootStackScreenProps<'NewTreatment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewTreatment'>['route']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleTreatmentSave = useCallback(async (treatment: TreatmentRequest) => {
    try {
      setLoading(true)
      const newTreatment = await dataContext.createTreatment(treatment)

      toast.showSuccessMessage(translator.translate('treatmentAdded'))

      if (DeviceEventEmitter.listenerCount('treatmentCreated') > 0) {
        DeviceEventEmitter.emit('treatmentCreated', newTreatment)
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
    const listener = DeviceEventEmitter.addListener('treatmentSaved', handleTreatmentSave)

    return () => {
      listener.remove()
    }
  }, [])

  return (
    <MainView>
      <TreatmentForm pageName='NewTreatment' patient={route.params?.patient} />
      {loading && <LoadingView />}
      {error && <Error onBtnPress={() => setError(false)} />}
    </MainView>
  )
}
