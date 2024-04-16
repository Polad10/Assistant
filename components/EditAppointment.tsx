import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import AppointmentForm from './AppointmentForm'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { AppointmentRequest } from '../models/Appointment'
import { DeviceEventEmitter } from 'react-native'
import MainView from './MainView'
import DeleteButton from './DeleteButton'
import LoadingView from './LoadingView'
import Error from './user-messages/Error'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ToastContext } from '../contexts/ToastContext'

export default function EditAppointment() {
  const navigation = useNavigation<RootStackScreenProps<'EditAppointment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditAppointment'>['route']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { appointmentId } = route.params
  const appointment = dataContext.appointments?.find((a) => a.id === appointmentId)

  const handleAppointmentSave = useCallback(async (appointment: AppointmentRequest) => {
    try {
      setLoading(true)
      await dataContext.updateAppointment(appointment)

      toast.showMessage(translator.translate('saved'))
      navigation.goBack()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true)
      await dataContext.deleteAppointment(appointmentId)

      toast.showDangerMessage(translator.translate('appointmentDeleted'))
      navigation.goBack()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const appointmentSaveListener = DeviceEventEmitter.addListener('appointmentSaved', handleAppointmentSave)
    const appointmentDeleteListener = DeviceEventEmitter.addListener('entityDeleted', handleDelete)

    return () => {
      appointmentSaveListener.remove()
      appointmentDeleteListener.remove()
    }
  }, [])

  return (
    <MainView>
      <AppointmentForm pageName='EditAppointment' appointment={appointment} />
      <DeleteButton />
      {loading && <LoadingView />}
      {error && <Error onBtnPress={() => setError(false)} />}
    </MainView>
  )
}
