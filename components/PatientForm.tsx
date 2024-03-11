import MyInput from './MyInput'
import MainView from './MainView'
import { DeviceEventEmitter, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import HeaderButton from './HeaderButton'
import { Patient, PatientRequest } from '../modals/Patient'
import CreateButton from './CreateButton'
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView'
import { translate } from '../helpers/Translator'
import DateInput, { DateInputRefType } from './DateInput'
import { DateTime } from 'luxon'
import { showDangerMessage } from '../helpers/ToastHelper'
import Toast from 'react-native-root-toast'

type Props = {
  patient?: Patient
  pageName: keyof RootStackParamList
}

export default function PatientForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  const [firstName, setFirstName] = useState(props.patient?.first_name)
  const [lastName, setLastName] = useState(props.patient?.last_name)
  const [city, setCity] = useState(props.patient?.city ?? '')
  const [phoneNr, setPhoneNr] = useState(props.patient?.phone ?? '')
  const [extraInfo, setExtraInfo] = useState(props.patient?.extra_info ?? '')

  const [showFirstNameInputError, setShowFirstNameInputError] = useState(false)
  const [showLastNameInputError, setShowLastNameInputError] = useState(false)

  const [focusedInputIndex, setFocusedInputIndex] = useState(0)

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
      showDangerMessage(translate('fillInAllRequiredFields'), Toast.positions.TOP)
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
        headerRight: () => <HeaderButton title={translate('save')} onPress={handleSave} />,
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
    <MyKeyboardAvoidingView focusedInputIndex={focusedInputIndex}>
      <MainView style={styles.mainView}>
        <MyInput
          label={translate('firstName')}
          placeholder={translate('enterFirstName')}
          value={firstName}
          showError={showFirstNameInputError}
          onChange={handleFirstNameChange}
          onFocus={() => setFocusedInputIndex(0)}
        />
        <MyInput
          label={translate('lastName')}
          placeholder={translate('enterLastName')}
          value={lastName}
          showError={showLastNameInputError}
          onChange={handleLastNameChange}
          onFocus={() => setFocusedInputIndex(1)}
        />
        <DateInput
          ref={dateInputRef}
          label={translate('dob')}
          placeholder={DateTime.local().minus({ years: 10 }).toISODate() ?? undefined}
          date={dobInitialVal}
          onFocus={() => setFocusedInputIndex(2)}
        />
        <MyInput
          label={translate('city')}
          placeholder={translate('enterCity')}
          value={city}
          onChange={handleCityChange}
          onFocus={() => setFocusedInputIndex(3)}
        />
        <MyInput
          label={translate('phoneNr')}
          placeholder={translate('enterPhoneNr')}
          keyboardType='phone-pad'
          value={phoneNr}
          onChange={handlePhoneNrChange}
          onFocus={() => setFocusedInputIndex(4)}
        />
        <MyInput
          label={translate('extraInfo')}
          placeholder={`${translate('enterExtraInfo')}`}
          multiline={true}
          value={extraInfo}
          onChange={handleExtraInfoChange}
          style={{ minHeight: 100 }}
          onFocus={() => setFocusedInputIndex(5)}
        />
        {!props.patient && <CreateButton onPress={handleSave} />}
      </MainView>
    </MyKeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
  },
})
