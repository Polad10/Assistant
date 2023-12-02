import { DeviceEventEmitter, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useNavigation, useTheme } from '@react-navigation/native'
import CustomIcon from './CustomIcon'
import { useCallback, useContext, useEffect, useState } from 'react'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import HeaderButton from './HeaderButton'
import { Payment, PaymentRequest } from '../modals/Payment'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'

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

  let dateInitialVal = new Date()

  if (props.payment?.date) {
    dateInitialVal = DateTime.fromISO(props.payment.date).toJSDate()
  }

  const [date, setDate] = useState(dateInitialVal)
  const [amount, setAmount] = useState(props.payment?.amount.toString())

  const [showAmountInputError, setShowAmountInputError] = useState(false)

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newPaymentRequest: PaymentRequest = {
        date: DateTime.fromJSDate(date).toISODate()!,
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

    if (!amount || isNaN(Number(amount))) {
      valid = false
      setShowAmountInputError(true)
    }

    return valid
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title='Save' onPress={handleSave} />,
    })
  }, [navigation, handleSave])

  function handleDateChange(event: DateTimePickerEvent, date: Date | undefined) {
    if (date) {
      setDate(date)
    }
  }

  function handleAmountChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowAmountInputError(false)
    setAmount(event.nativeEvent.text.replace(',', '.'))
  }

  return (
    <View>
      <DateTimeInput text='Date' showDatePicker={true} datetime={date} onChange={handleDateChange} />
      <MyInput
        placeholder='Amount'
        value={amount}
        showError={showAmountInputError}
        onChange={handleAmountChange}
        keyboardType='decimal-pad'
        rightIcon={<CustomIcon name='manat' color={colors.text} size={20} />}
      />
    </View>
  )
}
