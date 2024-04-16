import { DeviceEventEmitter, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import MyInput from './MyInput'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import HeaderButton from './HeaderButton'
import { Payment, PaymentRequest } from '../models/Payment'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import DateInput, { DateInputRefType } from './DateInput'
import CreateButton from './CreateButton'
import MainView from './MainView'
import { Treatment } from '../models/Treatment'
import TouchableInput from './TouchableInput'
import TouchableWithoutFeedbackInput from './TouchableWithoutFeedbackInput'
import { Patient } from '../models/Patient'
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView'
import { FontAwesome6 } from '@expo/vector-icons'
import { ThemeContext } from '../contexts/ThemeContext'
import Toast from 'react-native-root-toast'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ToastContext } from '../contexts/ToastContext'

type Props = {
  pageName: keyof RootStackParamList
  treatmentId?: number
  payment?: Payment
  patient?: Patient
}

export default function PaymentForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<'NewPayment'>['navigation']>()

  const themeContext = useContext(ThemeContext)!
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const treatmentId = props.payment?.treatment_id || props.treatmentId
  const treatment = dataContext.treatments?.find((t) => t.id === treatmentId)

  const treatmentEditable = !treatment

  let dateInitialVal = props.payment ? new Date(props.payment.date) : undefined

  const [amount, setAmount] = useState(props.payment?.amount.toString())
  const [selectedTreatment, setSelectedTreatment] = useState(treatment)

  const [showAmountInputError, setShowAmountInputError] = useState(false)
  const [showDatePickerError, setShowDatePickerError] = useState(false)
  const [showTreatmentInputError, setShowTreatmentInputError] = useState(false)

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
    } else {
      toast.showDangerMessage(translator.translate('fillInAllRequiredFields'), Toast.positions.TOP)
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
        headerRight: () => <HeaderButton title={translator.translate('save')} onPress={handleSave} />,
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
    <MainView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <MyKeyboardAvoidingView>
        <MainView>
          <DateInput
            ref={dateInputRef}
            label={translator.translate('date')}
            placeholder={DateTime.local().toISODate() ?? undefined}
            date={dateInitialVal}
            showError={showDatePickerError}
            onChange={() => setShowDatePickerError(false)}
          />
          <MyInput
            label={translator.translate('amount')}
            placeholder={translator.translate('enterAmount')}
            value={amount}
            showError={showAmountInputError}
            onChange={handleAmountChange}
            keyboardType='decimal-pad'
            rightIcon={<FontAwesome6 name='manat-sign' color={themeContext.neutral} size={20} />}
          />

          {treatmentEditable ? (
            <TouchableInput
              onPress={handleTreatmentChange}
              label={translator.translate('treatment')}
              placeholder={translator.translate('selectTreatment')}
              value={selectedTreatment?.title}
              showError={showTreatmentInputError}
            />
          ) : (
            <TouchableWithoutFeedbackInput
              label={translator.translate('treatment')}
              placeholder={translator.translate('selectTreatment')}
              value={selectedTreatment?.title}
              showError={showTreatmentInputError}
            />
          )}
        </MainView>
      </MyKeyboardAvoidingView>
      {!props.payment && <CreateButton onPress={handleSave} />}
    </MainView>
  )
}
