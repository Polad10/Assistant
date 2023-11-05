import { NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useTheme } from '@react-navigation/native'
import CustomIcon from './CustomIcon'
import { useCallback, useContext, useEffect, useState } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import HeaderButton from './HeaderButton'
import { PaymentRequest } from '@polad10/assistant-models/Payment'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'

export default function NewPayment({ navigation, route }: RootStackScreenProps<'NewPayment'>) {
  const { colors } = useTheme()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const treatmentId = route.params.treatmentId

  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState('')

  const [showAmountInputError, setShowAmountInputError] = useState(false)

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newPaymentRequest: PaymentRequest = {
        date: DateTime.fromJSDate(date).toISODate()!,
        amount: Number(amount),
        treatment_id: treatmentId,
      }

      await context.createPayment(newPaymentRequest)
      navigation.goBack()
    }
  }, [date, amount, treatmentId])

  function validate() {
    let valid = true

    if (!amount) {
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
