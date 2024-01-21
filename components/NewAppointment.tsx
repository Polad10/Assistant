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
import Error from './Error'

export default function NewAppointment() {
  const navigation = useNavigation<RootStackScreenProps<'NewAppointment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewAppointment'>['route']>()
  const context = useContext(DataContext)!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const treatment = route.params?.treatment
  const patient = route.params?.patient

  const handleAppointmentSave = useCallback(async (appointment: AppointmentRequest) => {
    try {
      setLoading(true)
      await context.createAppointment(appointment)

      showSuccessMessage('Appointment added')
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
