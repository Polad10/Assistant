import AppointmentForm from './AppointmentForm'
import { RootStackScreenProps } from '../types/Navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { AppointmentRequest } from '../models/Appointment'
import { DeviceEventEmitter } from 'react-native'
import MainView from './MainView'
import LoadingView from './LoadingView'
import Error from './user-messages/Error'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ToastContext } from '../contexts/ToastContext'

export default function NewAppointment() {
  const navigation = useNavigation<RootStackScreenProps<'NewAppointment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewAppointment'>['route']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const treatment = route.params?.treatment
  const patient = route.params?.patient

  const handleAppointmentSave = useCallback(async (appointment: AppointmentRequest) => {
    try {
      setLoading(true)
      await dataContext.createAppointment(appointment)

      toast.showSuccessMessage(translator.translate('appointmentAdded'))
      navigation.goBack()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('appointmentSaved', handleAppointmentSave)

    return () => {
      listener.remove()
    }
  }, [])

  return (
    <MainView>
      <AppointmentForm pageName='NewAppointment' treatment={treatment} patient={patient} />
      {loading && <LoadingView />}
      {error && <Error onBtnPress={() => setError(false)} />}
    </MainView>
  )
}
