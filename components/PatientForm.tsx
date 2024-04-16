import MyInput from './MyInput'
import MainView from './MainView'
import { DeviceEventEmitter, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import HeaderButton from './HeaderButton'
import { Patient, PatientRequest } from '../models/Patient'
import CreateButton from './CreateButton'
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView'
import DateInput, { DateInputRefType } from './DateInput'
import { DateTime } from 'luxon'
import Toast from 'react-native-root-toast'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ToastContext } from '../contexts/ToastContext'

type Props = {
  patient?: Patient
  pageName: keyof RootStackParamList
}

export default function PatientForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const [firstName, setFirstName] = useState(props.patient?.first_name)
  const [lastName, setLastName] = useState(props.patient?.last_name)
  const [city, setCity] = useState(props.patient?.city ?? '')
  const [phoneNr, setPhoneNr] = useState(props.patient?.phone ?? '')
  const [extraInfo, setExtraInfo] = useState(props.patient?.extra_info ?? '')

  const [showFirstNameInputError, setShowFirstNameInputError] = useState(false)
  const [showLastNameInputError, setShowLastNameInputError] = useState(false)

  const dateInputRef = useRef<DateInputRefType>()
  let dobInitialVal = props.patient?.dob ? new Date(props.patient.dob) : undefined

  const handleSave = useCallback(async () => {
    if (validate()) {
      const dob = dateInputRef.current?.getDate()

      const newPatientRequest: PatientRequest = {
        first_name: firstName!,
        last_name: lastName!,
        dob: dob ? DateTime.fromJSDate(dob).toISODate() : dob,
        city: city,
        phone: phoneNr,
        extra_info: extraInfo,
      }

      if (props.patient) {
        newPatientRequest.id = props.patient.id
      }

      DeviceEventEmitter.emit('patientSaved', newPatientRequest)
    } else {
      toast.showDangerMessage(translator.translate('fillInAllRequiredFields'), Toast.positions.TOP)
    }
  }, [firstName, lastName, city, phoneNr, extraInfo])

  function validate() {
    let valid = true

    if (!firstName) {
      valid = false
      setShowFirstNameInputError(true)
    }

    if (!lastName) {
      valid = false
      setShowLastNameInputError(true)
    }

    return valid
  }

  useEffect(() => {
    if (props.patient) {
      navigation.setOptions({
        headerRight: () => <HeaderButton title={translator.translate('save')} onPress={handleSave} />,
      })
    }
  }, [navigation, handleSave])

  function handleFirstNameChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowFirstNameInputError(false)
    setFirstName(event.nativeEvent.text)
  }

  function handleLastNameChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowLastNameInputError(false)
    setLastName(event.nativeEvent.text)
  }

  function handleCityChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setCity(event.nativeEvent.text)
  }

  function handlePhoneNrChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setPhoneNr(event.nativeEvent.text)
  }

  function handleExtraInfoChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setExtraInfo(event.nativeEvent.text)
  }

  return (
    <MainView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <MyKeyboardAvoidingView>
        <MyInput
          label={translator.translate('firstName')}
          placeholder={translator.translate('enterFirstName')}
          value={firstName}
          showError={showFirstNameInputError}
          onChange={handleFirstNameChange}
        />
        <MyInput
          label={translator.translate('lastName')}
          placeholder={translator.translate('enterLastName')}
          value={lastName}
          showError={showLastNameInputError}
          onChange={handleLastNameChange}
        />
        <DateInput
          ref={dateInputRef}
          label={translator.translate('dob')}
          placeholder={DateTime.local().minus({ years: 10 }).toISODate() ?? undefined}
          date={dobInitialVal}
        />
        <MyInput
          label={translator.translate('city')}
          placeholder={translator.translate('enterCity')}
          value={city}
          onChange={handleCityChange}
        />
        <MyInput
          label={translator.translate('phoneNr')}
          placeholder={translator.translate('enterPhoneNr')}
          keyboardType='phone-pad'
          value={phoneNr}
          onChange={handlePhoneNrChange}
        />
        <MyInput
          label={translator.translate('extraInfo')}
          placeholder={`${translator.translate('enterExtraInfo')}`}
          multiline={true}
          value={extraInfo}
          onChange={handleExtraInfoChange}
          style={{ minHeight: 100 }}
          returnKeyType='default'
        />
      </MyKeyboardAvoidingView>
      {!props.patient && <CreateButton onPress={handleSave} />}
    </MainView>
  )
}
