import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useState } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import { DataContext } from '../contexts/DataContext'
import { PaymentRequest } from '../models/Payment'
import { DeviceEventEmitter } from 'react-native'
import PaymentForm from './PaymentForm'
import MainView from './MainView'
import DeleteButton from './DeleteButton'
import { showDangerMessage, showMessage } from '../helpers/ToastHelper'
import LoadingView from './LoadingView'
import Error from './user-messages/Error'
import { LocalizationContext } from '../contexts/LocalizationContext'

export default function EditPayment() {
  const navigation = useNavigation<RootStackScreenProps<'EditPayment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditPayment'>['route']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const paymentId = route.params.paymentId
  const payment = dataContext.payments?.find((p) => p.id === paymentId)

  const handlePaymentSave = useCallback(async (payment: PaymentRequest) => {
    try {
      setLoading(true)
      await dataContext.updatePayment(payment)

      showMessage(translator.translate('saved'))
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
      await dataContext.deletePayment(paymentId)

      showDangerMessage(translator.translate('paymentDeleted'))
      navigation.goBack()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
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
      {loading && <LoadingView />}
      {error && <Error onBtnPress={() => setError(false)} />}
    </MainView>
  )
}
