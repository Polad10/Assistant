import { DeviceEventEmitter, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native'
import MyInput from './MyInput'
import { useNavigation, useTheme } from '@react-navigation/native'
import CustomIcon from './CustomIcon'
import { useCallback, useContext, useEffect, useState } from 'react'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import HeaderButton from './HeaderButton'
import { Payment, PaymentRequest } from '../modals/Payment'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import DateInput from './DateInput'
import CreateButton from './CreateButton'
import MainView from './MainView'

type Props = {
  pageName: keyof RootStackParamList
  treatmentId?: number
  payment?: Payment
}

export default function PaymentForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<'NewPayment'>['navigation']>()

  const { colors } = useTheme()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const treatmentId = props.payment?.treatment_id || props.treatmentId

  let dateInitialVal = props.payment ? new Date(props.payment.date) : undefined

  const [date, setDate] = useState(dateInitialVal)
  const [amount, setAmount] = useState(props.payment?.amount.toString())

  const [showAmountInputError, setShowAmountInputError] = useState(false)
  const [showDatePickerError, setShowDatePickerError] = useState(false)

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newPaymentRequest: PaymentRequest = {
        date: DateTime.fromJSDate(date!).toISODate()!,
        amount: Number(amount),
        treatment_id: treatmentId!,
      }

      if (props.payment) {
        newPaymentRequest.id = props.payment.id
      }

      DeviceEventEmitter.emit('paymentSaved', newPaymentRequest)
    }
  }, [date, amount, treatmentId])

  function validate() {
    let valid = true

    if (!date) {
      valid = false
      setShowDatePickerError(true)
    }

    if (!amount || isNaN(Number(amount))) {
      valid = false
      setShowAmountInputError(true)
    }

    return valid
  }

  useEffect(() => {
    if (props.payment) {
      navigation.setOptions({
        headerRight: () => <HeaderButton title='Save' onPress={handleSave} />,
      })
    }
  }, [navigation, handleSave])

  function handleDateChange(date: Date) {
    setDate(date)
    setShowDatePickerError(false)
  }

  function handleAmountChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowAmountInputError(false)
    setAmount(event.nativeEvent.text.replace(',', '.'))
  }

  return (
    <MainView>
      <DateInput
        label='Date'
        placeholder='Pick a date'
        date={date}
        showError={showDatePickerError}
        onChange={handleDateChange}
      />
      <MyInput
        label='Amount'
        placeholder='Enter amount'
        value={amount}
        showError={showAmountInputError}
        onChange={handleAmountChange}
        keyboardType='decimal-pad'
        rightIcon={<CustomIcon name='manat' color={colors.notification} size={20} />}
      />

      {!props.payment && <CreateButton onPress={handleSave} />}
    </MainView>
  )
}
