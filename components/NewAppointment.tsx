import AppointmentForm from './AppointmentForm'
import { RootStackScreenProps } from '../types/Navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { AppointmentRequest } from '../modals/Appointment'
import { DeviceEventEmitter } from 'react-native'
import { showSuccessMessage } from '../helpers/ToastHelper'
import MainView from './MainView'
import LoadingView from './LoadingView'

export default function NewAppointment() {
  const navigation = useNavigation<RootStackScreenProps<'NewAppointment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewAppointment'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const [loading, setLoading] = useState(false)

  const treatment = route.params?.treatment
  const patient = route.params?.patient

  const handleAppointmentSave = useCallback(async (appointment: AppointmentRequest) => {
    setLoading(true)
    await context.createAppointment(appointment)
    setLoading(false)

    showSuccessMessage('Appointment added')
    navigation.goBack()
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
    </MainView>
  )
}
