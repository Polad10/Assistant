import { useNavigation, useRoute } from '@react-navigation/native'
import PaymentForm from './PaymentForm'
import { RootStackScreenProps } from '../types/Navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { PaymentRequest } from '../modals/Payment'
import { DeviceEventEmitter } from 'react-native'
import { showSuccessMessage } from '../helpers/ToastHelper'
import MainView from './MainView'
import LoadingView from './LoadingView'

export default function NewPayment() {
  const navigation = useNavigation<RootStackScreenProps<'NewPayment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewPayment'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const [loading, setLoading] = useState(false)

  const treatmentId = route.params.treatmentId
  const patient = route.params.patient

  const handlePaymentSave = useCallback(async (payment: PaymentRequest) => {
    setLoading(true)
    await context.createPayment(payment)
    setLoading(false)

    showSuccessMessage('Payment added')
    navigation.goBack()
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('paymentSaved', handlePaymentSave)

    return () => {
      listener.remove()
    }
  }, [])

  return (
    <MainView>
      <PaymentForm pageName='NewPayment' treatmentId={treatmentId} patient={patient} />
      {loading && <LoadingView />}
    </MainView>
  )
}
