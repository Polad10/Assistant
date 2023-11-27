import MyInput from './MyInput'
import MainView from './MainView'
import { DeviceEventEmitter, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { DataContext } from '../contexts/DataContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import HeaderButton from './HeaderButton'
import { Patient, PatientRequest } from '@polad10/assistant-models/Patient'

type Props = {
  patient?: Patient
  pageName: keyof RootStackParamList
}

export default function PatientForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const [firstName, setFirstName] = useState(props.patient?.first_name)
  const [lastName, setLastName] = useState(props.patient?.last_name)
  const [city, setCity] = useState(props.patient?.city ?? '')
  const [phoneNr, setPhoneNr] = useState(props.patient?.phone ?? '')
  const [extraInfo, setExtraInfo] = useState(props.patient?.extra_info ?? '')

  const [showFirstNameInputError, setShowFirstNameInputError] = useState(false)
  const [showLastNameInputError, setShowLastNameInputError] = useState(false)

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newPatientRequest: PatientRequest = {
        first_name: firstName!,
        last_name: lastName!,
        city: city,
        phone: phoneNr,
        extra_info: extraInfo,
      }

      if (props.patient) {
        newPatientRequest.id = props.patient.id
      }

      DeviceEventEmitter.emit('patientSaved', newPatientRequest)
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
    navigation.setOptions({
      headerRight: () => <HeaderButton title='Save' onPress={handleSave} />,
    })
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
    <MainView style={styles.mainView}>
      <MyInput
        label='First Name'
        placeholder='Enter first name'
        value={firstName}
        showError={showFirstNameInputError}
        onChange={handleFirstNameChange}
      />
      <MyInput
        label='Last Name'
        placeholder='Enter last name'
        value={lastName}
        showError={showLastNameInputError}
        onChange={handleLastNameChange}
      />
      <MyInput label='City' placeholder='Enter city' value={city} onChange={handleCityChange} />
      <MyInput
        label='Phone Number'
        placeholder='Enter phone number'
        keyboardType='phone-pad'
        value={phoneNr}
        onChange={handlePhoneNrChange}
      />
      <MyInput
        label='Extra Info'
        placeholder='Enter extra info...'
        multiline={true}
        value={extraInfo}
        onChange={handleExtraInfoChange}
        style={{ minHeight: 100 }}
      />
    </MainView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
  },
})
