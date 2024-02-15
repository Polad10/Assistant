import { DeviceEventEmitter, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import MyInput from './MyInput'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import HeaderButton from './HeaderButton'
import { Payment, PaymentRequest } from '../modals/Payment'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import DateInput, { DateInputRefType } from './DateInput'
import CreateButton from './CreateButton'
import MainView from './MainView'
import { Treatment } from '../modals/Treatment'
import TouchableInput from './TouchableInput'
import TouchableWithoutFeedbackInput from './TouchableWithoutFeedbackInput'
import { Patient } from '../modals/Patient'
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView'
import { FontAwesome6 } from '@expo/vector-icons'
import { ThemeContext } from '../contexts/ThemeContext'
import { translate } from '../helpers/Translator'

type Props = {
  pageName: keyof RootStackParamList
  treatmentId?: number
  payment?: Payment
  patient?: Patient
}

export default function PaymentForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<'NewPayment'>['navigation']>()

  const themeContext = useContext(ThemeContext)!
  const context = useContext(DataContext)!

  const treatmentId = props.payment?.treatment_id || props.treatmentId
  const treatment = context.treatments?.find((t) => t.id === treatmentId)

  const treatmentEditable = !treatment

  let dateInitialVal = props.payment ? new Date(props.payment.date) : undefined

  const [amount, setAmount] = useState(props.payment?.amount.toString())
  const [selectedTreatment, setSelectedTreatment] = useState(treatment)

  const [showAmountInputError, setShowAmountInputError] = useState(false)
  const [showDatePickerError, setShowDatePickerError] = useState(false)
  const [showTreatmentInputError, setShowTreatmentInputError] = useState(false)

  const [focusedInputIndex, setFocusedInputIndex] = useState(0)

  const dateInputRef = useRef<DateInputRefType>()

  const handleSave = useCallback(async () => {
    if (validate()) {
      const date = dateInputRef.current?.getDate()

      const newPaymentRequest: PaymentRequest = {
        date: DateTime.fromJSDate(date!).toISODate()!,
        amount: Number(amount),
        treatment_id: selectedTreatment!.id,
      }

      if (props.payment) {
        newPaymentRequest.id = props.payment.id
      }

      DeviceEventEmitter.emit('paymentSaved', newPaymentRequest)
    }
  }, [amount, selectedTreatment])

  function validate() {
    let valid = true

    const date = dateInputRef.current?.getDate()

    if (!date) {
      valid = false
      setShowDatePickerError(true)
    }

    if (!amount || isNaN(Number(amount))) {
      valid = false
      setShowAmountInputError(true)
    }

    if (!selectedTreatment) {
      valid = false
      setShowTreatmentInputError(true)
    }

    return valid
  }

  useEffect(() => {
    if (props.payment) {
      navigation.setOptions({
        headerRight: () => <HeaderButton title={translate('save')} onPress={handleSave} />,
      })
    }
  }, [navigation, handleSave])

  useEffect(() => {
    const treatmentSelectedListener = DeviceEventEmitter.addListener('treatmentSelected', handleTreatmentSelect)
    const treatmentCreatedListener = DeviceEventEmitter.addListener('treatmentCreated', handleTreatmentSelect)

    return () => {
      treatmentSelectedListener.remove()
      treatmentCreatedListener.remove()
    }
  }, [])

  function handleAmountChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowAmountInputError(false)
    setAmount(event.nativeEvent.text.replace(',', '.'))
  }

  function handleTreatmentSelect(treatment: Treatment) {
    navigation.navigate('NewPayment', { treatmentId: props.treatmentId, patient: props.patient })

    setShowTreatmentInputError(false)
    setSelectedTreatment(treatment)
  }

  function handleTreatmentChange() {
    if (treatmentEditable) {
      navigation.navigate('Treatments', { patient: props.patient })
    }
  }

  return (
    <MyKeyboardAvoidingView focusedInputIndex={focusedInputIndex}>
      <MainView style={{ paddingTop: 20 }}>
        <DateInput
          ref={dateInputRef}
          label={translate('date')}
          placeholder={translate('pickDate')}
          date={dateInitialVal}
          showError={showDatePickerError}
          onChange={() => setShowDatePickerError(false)}
          onFocus={() => setFocusedInputIndex(0)}
        />
        <MyInput
          label={translate('amount')}
          placeholder={translate('enterAmount')}
          value={amount}
          showError={showAmountInputError}
          onChange={handleAmountChange}
          keyboardType='decimal-pad'
          rightIcon={<FontAwesome6 name='manat-sign' color={themeContext.neutral} size={20} />}
          onFocus={() => setFocusedInputIndex(1)}
        />

        {treatmentEditable ? (
          <TouchableInput
            onPress={handleTreatmentChange}
            label={translate('treatment')}
            placeholder={translate('selectTreatment')}
            value={selectedTreatment?.title}
            showError={showTreatmentInputError}
          />
        ) : (
          <TouchableWithoutFeedbackInput
            label={translate('treatment')}
            placeholder={translate('selectTreatment')}
            value={selectedTreatment?.title}
            showError={showTreatmentInputError}
          />
        )}

        {!props.payment && <CreateButton onPress={handleSave} />}
      </MainView>
    </MyKeyboardAvoidingView>
  )
}
