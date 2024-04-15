import { useNavigation, useRoute } from '@react-navigation/native'
import PaymentForm from './PaymentForm'
import { RootStackScreenProps } from '../types/Navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { PaymentRequest } from '../models/Payment'
import { DeviceEventEmitter } from 'react-native'
import { showSuccessMessage } from '../helpers/ToastHelper'
import MainView from './MainView'
import LoadingView from './LoadingView'
import Error from './user-messages/Error'
import { LocalizationContext } from '../contexts/LocalizationContext'

export default function NewPayment() {
  const navigation = useNavigation<RootStackScreenProps<'NewPayment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'NewPayment'>['route']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const treatmentId = route.params.treatmentId
  const patient = route.params.patient

  const handlePaymentSave = useCallback(async (payment: PaymentRequest) => {
    try {
      setLoading(true)
      await dataContext.createPayment(payment)

      showSuccessMessage(translator.translate('paymentAdded'))
      navigation.goBack()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
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
      {error && <Error onBtnPress={() => setError(false)} />}
    </MainView>
  )
}
