import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useContext, useEffect } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import { DataContext } from '../contexts/DataContext'
import { PaymentRequest } from '../modals/Payment'
import { DeviceEventEmitter } from 'react-native'
import PaymentForm from './PaymentForm'
import MainView from './MainView'
import DeleteButton from './DeleteButton'
import { showMessage } from '../helpers/ToastHelper'

export default function EditPayment() {
  const navigation = useNavigation<RootStackScreenProps<'EditPayment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditPayment'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const paymentId = route.params.paymentId
  const payment = context.payments?.find((p) => p.id === paymentId)

  const handlePaymentSave = useCallback(async (payment: PaymentRequest) => {
    await context.updatePayment(payment)
    showMessage('Saved')

    navigation.goBack()
  }, [])

  const handleDelete = useCallback(async () => {
    await context.deletePayment(paymentId)

    navigation.goBack()
  }, [])

  useEffect(() => {
    const paymentSaveListener = DeviceEventEmitter.addListener('paymentSaved', handlePaymentSave)
    const paymentDeleteListener = DeviceEventEmitter.addListener('entityDeleted', handleDelete)

    return () => {
      paymentSaveListener.remove()
      paymentDeleteListener.remove()
    }
  }, [])

  return (
    <MainView>
      <PaymentForm pageName='EditPayment' payment={payment} />
      <DeleteButton />
    </MainView>
  )
}
