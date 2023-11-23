import AppointmentForm from './AppointmentForm'
import { RootStackScreenProps } from '../types/Navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useContext, useEffect } from 'react'
import { DataContext } from '../contexts/DataContext'
import { AppointmentRequest } from '@polad10/assistant-models/Appointment'
import { DeviceEventEmitter } from 'react-native'

export default function NewAppointment() {
  const navigation = useNavigation<RootStackScreenProps<'NewAppointment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewAppointment'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const treatment = route.params?.treatment

  const handleAppointmentSave = useCallback(async (appointment: AppointmentRequest) => {
    await context.createAppointment(appointment)

    navigation.goBack()
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('appointmentSaved', handleAppointmentSave)

    return () => {
      listener.remove()
    }
  }, [])

  return <AppointmentForm pageName='NewAppointment' treatment={treatment} />
}
