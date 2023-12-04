import { StyleSheet, DeviceEventEmitter, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native'
import MyInput from './MyInput'
import { useCallback, useContext, useEffect, useState } from 'react'
import DateTimeInput from './DateTimeInput'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { getPatientFullName } from '../helpers/PatientHelper'
import { Patient } from '../modals/Patient'
import HeaderButton from './HeaderButton'
import { Treatment, TreatmentRequest } from '../modals/Treatment'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useNavigation, useTheme } from '@react-navigation/native'
import CustomIcon from './CustomIcon'
import { CheckBox } from '@rneui/themed'
import { Colors } from '../types/Colors'
import TouchableInput from './TouchableInput'
import TouchableWithoutFeedbackInput from './TouchableWithoutFeedbackInput'

type StyleProps = {
  patientEditable: boolean
  colors: Colors
}

type Props = {
  pageName: keyof RootStackParamList
  patient?: Patient
  treatment?: Treatment
}

export default function TreatmentForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const context = useContext(DataContext)
  const { colors } = useTheme()

  if (!context) {
    return
  }

  const [showPatientInputError, setShowPatientInputError] = useState(false)
  const [showTitleInputError, setShowTitleInputError] = useState(false)
  const [showPriceInputError, setShowPriceInputError] = useState(false)
  const [showStartDatePickerError, setShowStartDatePickerError] = useState(false)

  let startDateInitialVal = undefined
  let endDateInitialVal = undefined

  let patient = props.patient

  if (props.treatment) {
    patient = context.patients?.find((p) => p.id === props.treatment?.patient_id)
    startDateInitialVal = new Date(props.treatment.start_date)

    if (props.treatment.end_date) {
      endDateInitialVal = new Date(props.treatment.end_date)
    }
  }

  const [selectedPatient, setSelectedPatient] = useState(patient)
  const [startDate, setStartDate] = useState(startDateInitialVal)
  const [endDate, setEndDate] = useState(endDateInitialVal)
  const [title, setTitle] = useState(props.treatment?.title)
  const [price, setPrice] = useState(props.treatment?.price.toString())

  let styleProps: StyleProps = {
    patientEditable: !patient,
    colors: colors,
  }

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newTreatmentRequest: TreatmentRequest = {
        start_date: DateTime.fromJSDate(startDate!).toISODate()!,
        end_date: endDate ? DateTime.fromJSDate(endDate).toISODate() : null,
        title: title!,
        patient_id: selectedPatient!.id,
        price: Number(price),
      }

      if (props.treatment) {
        newTreatmentRequest.id = props.treatment.id
      }

      DeviceEventEmitter.emit('treatmentSaved', newTreatmentRequest)
    }
  }, [selectedPatient, startDate, endDate, title, price])

  function validate() {
    let valid = true

    if (!startDate) {
      valid = false
      setShowStartDatePickerError(true)
    }

    if (!selectedPatient) {
      valid = false
      setShowPatientInputError(true)
    }

    if (!title) {
      valid = false
      setShowTitleInputError(true)
    }

    if (!price || isNaN(Number(price))) {
      valid = false
      setShowPriceInputError(true)
    }

    return valid
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title='Save' onPress={handleSave} />,
    })

    const patientSelectListener = DeviceEventEmitter.addListener('patientSelected', handlePatientSelect)
    const patientCreatedListener = DeviceEventEmitter.addListener('patientCreated', handlePatientSelect)

    return () => {
      patientSelectListener.remove()
      patientCreatedListener.remove()
    }
  }, [navigation, handleSave])

  function getSelectedPatientFullName() {
    return selectedPatient ? getPatientFullName(selectedPatient) : ''
  }

  function handleStartDateChange(date: Date) {
    setStartDate(date)
    setShowStartDatePickerError(false)
  }

  function handleEndDateChange(date: Date) {
    setEndDate(date)
  }

  function handleTitleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowTitleInputError(false)
    setTitle(event.nativeEvent.text)
  }

  function handlePriceChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowPriceInputError(false)
    setPrice(event.nativeEvent.text.replace(',', '.'))
  }

  function handlePatientSelect(patient: Patient) {
    // first navigate, then set patient
    // avoids reseting patient
    navigation.navigate('NewTreatment')

    setShowPatientInputError(false)
    setSelectedPatient(patient)
  }

  function handlePatientChange() {
    if (styleProps.patientEditable) {
      navigation.navigate('Patients', { pageName: 'NewTreatment' })
    }
  }

  return (
    <MainView style={{ paddingTop: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <DateTimeInput
          dateLabel='Start date'
          datePlaceholder='Pick a date'
          showDatePicker={true}
          datetime={startDate}
          showDatePickerError={showStartDatePickerError}
          onDateChange={handleStartDateChange}
        />
        <DateTimeInput
          dateLabel='End date'
          datePlaceholder='Pick a date'
          showDatePicker={true}
          datetime={endDate}
          onDateChange={handleEndDateChange}
        />
      </View>
      <MyInput
        label='Title'
        placeholder='Enter title'
        value={title}
        showError={showTitleInputError}
        onChange={handleTitleChange}
      />
      <MyInput
        label='Price'
        placeholder='Enter price'
        value={price}
        showError={showPriceInputError}
        onChange={handlePriceChange}
        keyboardType='decimal-pad'
        rightIcon={<CustomIcon name='manat' color={colors.notification} size={20} />}
      />
      {styleProps.patientEditable ? (
        <TouchableInput
          onPress={handlePatientChange}
          label='Patient'
          placeholder='Select'
          value={getSelectedPatientFullName()}
          showError={showPatientInputError}
        />
      ) : (
        <TouchableWithoutFeedbackInput
          label='Patient'
          placeholder='Select'
          value={getSelectedPatientFullName()}
          showError={showPatientInputError}
        />
      )}
    </MainView>
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    patient: {
      opacity: styleProps.patientEditable ? 1 : 0.5,
    },
    checkbox: {
      backgroundColor: styleProps.colors.background,
      margin: 0,
      paddingLeft: 0,
      borderBottomWidth: 1,
      borderBottomColor: styleProps.colors.border,
    },
    checkboxText: {
      fontSize: 18,
      fontWeight: 'normal',
    },
  })
