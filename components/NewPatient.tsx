import MyInput from './MyInput'
import MainView from './MainView'
import { DeviceEventEmitter, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import { DataContext } from '../contexts/DataContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import HeaderButton from './HeaderButton'
import { PatientRequest } from '@polad10/assistant-models/Patient'

export default function NewPatient() {
  const navigation = useNavigation<RootStackScreenProps<'NewPatient'>['navigation']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [phoneNr, setPhoneNr] = useState('')
  const [extraInfo, setExtraInfo] = useState('')

  const [showFirstNameInputError, setShowFirstNameInputError] = useState(false)
  const [showLastNameInputError, setShowLastNameInputError] = useState(false)

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newPatientRequest: PatientRequest = {
        first_name: firstName,
        last_name: lastName,
        city: city,
        phone: phoneNr,
        extra_info: extraInfo,
      }

      const newPatient = await context.createPatient(newPatientRequest)

      if (DeviceEventEmitter.listenerCount('patientCreated') > 0) {
        DeviceEventEmitter.emit('patientCreated', newPatient)
      } else {
        navigation.goBack()
      }
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
        placeholder='First name'
        value={firstName}
        showError={showFirstNameInputError}
        onChange={handleFirstNameChange}
      />
      <MyInput
        placeholder='Last name'
        value={lastName}
        showError={showLastNameInputError}
        onChange={handleLastNameChange}
      />
      <MyInput placeholder='City' value={city} onChange={handleCityChange} />
      <MyInput placeholder='Phone number' keyboardType='phone-pad' value={phoneNr} onChange={handlePhoneNrChange} />
      <MyInput placeholder='Extra info' multiline={true} value={extraInfo} onChange={handleExtraInfoChange} />
    </MainView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
  },
})
