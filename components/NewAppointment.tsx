import AppointmentForm from './AppointmentForm'
import { RootStackScreenProps } from '../types/Navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useContext, useEffect } from 'react'
import { DataContext } from '../contexts/DataContext'
import { AppointmentRequest } from '../modals/Appointment'
import { DeviceEventEmitter } from 'react-native'
import Toast from 'react-native-root-toast'
import { showSuccessMessage } from '../helpers/ToastHelper'

export default function NewAppointment() {
  const navigation = useNavigation<RootStackScreenProps<'NewAppointment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewAppointment'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const treatment = route.params?.treatment
  const patient = route.params?.patient

  const handleAppointmentSave = useCallback(async (appointment: AppointmentRequest) => {
    await context.createAppointment(appointment)
    showSuccessMessage('Appointment added')

    navigation.goBack()
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('appointmentSaved', handleAppointmentSave)

    return () => {
      listener.remove()
    }
  }, [])

  return <AppointmentForm pageName='NewAppointment' treatment={treatment} patient={patient} />
}
