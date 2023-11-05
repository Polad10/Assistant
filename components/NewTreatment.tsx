import { StyleSheet, DeviceEventEmitter, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import MyInput from './MyInput'
import { useCallback, useContext, useEffect, useState } from 'react'
import DateTimeInput from './DateTimeInput'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { getPatientFullName } from '../helpers/PatientHelper'
import { Patient } from '@polad10/assistant-models/Patient'
import HeaderButton from './HeaderButton'
import { TreatmentRequest } from '@polad10/assistant-models/Treatment'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'

type StyleProps = {
  patientEditable: boolean
}

export default function NewTreatment({ navigation, route }: RootStackScreenProps<'NewTreatment'>) {
  const [showPatientInputError, setShowPatientInputError] = useState(false)
  const [showTitleInputError, setShowTitleInputError] = useState(false)

  const [patient, setPatient] = useState<Patient | undefined>(route.params?.patient)
  const [startDate, setStartDate] = useState(new Date())
  const [title, setTitle] = useState<string | undefined>(undefined)

  const context = useContext(DataContext)

  if (!context) {
    return
  }

  let styleProps: StyleProps = {
    patientEditable: true,
  }

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newTreatmentRequest: TreatmentRequest = {
        start_date: DateTime.fromJSDate(startDate).toISODate()!,
        title: title!,
        patient_id: patient!.id,
      }

      const newTreatment = await context.createTreatment(newTreatmentRequest)

      DeviceEventEmitter.emit('treatmentCreated', newTreatment)
    }
  }, [patient, startDate, title])

  function validate() {
    let valid = true

    if (!patient) {
      valid = false
      setShowPatientInputError(true)
    }

    if (!title) {
      valid = false
      setShowTitleInputError(true)
    }

    return valid
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title='Save' onPress={handleSave} />,
    })

    const patientSelectListener = DeviceEventEmitter.addListener('patientSelected', handlePatientSelect)
    const patientCreatedListener = DeviceEventEmitter.addListener('patientCreated', handlePatientSelect)

    styleProps.patientEditable = patient == null

    return () => {
      patientSelectListener.remove()
      patientCreatedListener.remove()
    }
  }, [navigation, handleSave])

  function getSelectedPatientFullName() {
    return patient ? getPatientFullName(patient) : ''
  }

  function handleStartDateChange(event: DateTimePickerEvent, startDate: Date | undefined) {
    if (startDate) {
      setStartDate(startDate)
    }
  }

  function handleTitleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowTitleInputError(false)
    setTitle(event.nativeEvent.text)
  }

  function handlePatientSelect(patient: Patient) {
    // first navigate, then set patient
    // avoids reseting patient
    navigation.navigate('NewTreatment')

    setShowPatientInputError(false)
    setPatient(patient)
  }

  function handlePatientChange() {
    if (styleProps.patientEditable) {
      navigation.navigate('Patients', { pageName: 'NewTreatment' })
    }
  }

  return (
    <MainView>
      <DateTimeInput text='Start date' showDatePicker={true} datetime={startDate} onChange={handleStartDateChange} />
      <MyInput placeholder='Title' value={title} showError={showTitleInputError} onChange={handleTitleChange} />
      <MyInput
        placeholder='Choose patient'
        onPressIn={handlePatientChange}
        value={getSelectedPatientFullName()}
        editable={false}
        style={styles(styleProps).patient}
        showError={showPatientInputError}
      />
    </MainView>
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    patient: {
      opacity: styleProps.patientEditable ? 1 : 0.5,
    },
  })
