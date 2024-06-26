import { useNavigation, useRoute } from '@react-navigation/native'
import TreatmentForm from './TreatmentForm'
import { useCallback, useContext, useEffect, useState } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import { DataContext } from '../contexts/DataContext'
import { TreatmentRequest } from '../models/Treatment'
import { DeviceEventEmitter } from 'react-native'
import MainView from './MainView'
import DeleteButton from './DeleteButton'
import LoadingView from './LoadingView'
import Error from './user-messages/Error'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ToastContext } from '../contexts/ToastContext'

export default function EditTreatment() {
  const navigation = useNavigation<RootStackScreenProps<'EditTreatment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditTreatment'>['route']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const treatmentId = route.params.treatmentId
  const treatment = dataContext.treatments?.find((t) => t.id === treatmentId)
  const patient = dataContext.patients?.find((p) => p.id === treatment?.patient_id)

  const handleTreatmentSave = useCallback(async (treatment: TreatmentRequest) => {
    try {
      setLoading(true)
      await dataContext.updateTreatment(treatment)

      toast.showMessage(translator.translate('saved'))
      navigation.goBack()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
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
    try {
      if (patient) {
        setLoading(true)
        await dataContext.deleteTreatment(treatmentId)

        toast.showDangerMessage(translator.translate('treatmentDeleted'))
        navigation.navigate('Patient', { patientId: patient.id })
      }
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <MainView>
      <TreatmentForm pageName='EditTreatment' treatment={treatment} />
      <DeleteButton />
      {loading && <LoadingView />}
      {error && <Error onBtnPress={() => setError(false)} />}
    </MainView>
  )
}
