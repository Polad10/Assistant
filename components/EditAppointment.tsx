import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import AppointmentForm from './AppointmentForm'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { AppointmentRequest } from '../modals/Appointment'
import { DeviceEventEmitter } from 'react-native'
import MainView from './MainView'
import DeleteButton from './DeleteButton'
import { showDangerMessage, showMessage } from '../helpers/ToastHelper'
import LoadingView from './LoadingView'
import Error from './Error'

export default function EditAppointment() {
  const navigation = useNavigation<RootStackScreenProps<'EditAppointment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditAppointment'>['route']>()
  const context = useContext(DataContext)!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { appointmentId } = route.params
  const appointment = context.appointments?.find((a) => a.id === appointmentId)

  const handleAppointmentSave = useCallback(async (appointment: AppointmentRequest) => {
    try {
      setLoading(true)
      await context.updateAppointment(appointment)

      showMessage('Saved')
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
      await context.deleteAppointment(appointmentId)

      showDangerMessage('Appointment deleted')
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

  function getContent() {
    if (error) {
      return <Error onBtnPress={() => setError(false)} />
    } else {
      return (
        <MainView>
          <AppointmentForm pageName='EditAppointment' appointment={appointment} />
          <DeleteButton />
          {loading && <LoadingView />}
        </MainView>
      )
    }
  }

  return getContent()
}
