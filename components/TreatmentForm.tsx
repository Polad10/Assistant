import { StyleSheet, DeviceEventEmitter, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import MyInput from './MyInput'
import { useCallback, useContext, useEffect, useState } from 'react'
import DateTimeInput from './DateTimeInput'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { getPatientFullName } from '../helpers/PatientHelper'
import { Patient } from '@polad10/assistant-models/Patient'
import HeaderButton from './HeaderButton'
import { Treatment, TreatmentRequest } from '@polad10/assistant-models/Treatment'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useNavigation, useTheme } from '@react-navigation/native'
import CustomIcon from './CustomIcon'
import { CheckBox } from '@rneui/themed'
import { Colors } from '../types/Colors'

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
  const { colors } = useTheme()
  const [showPatientInputError, setShowPatientInputError] = useState(false)
  const [showTitleInputError, setShowTitleInputError] = useState(false)
  const [showPriceInputError, setShowPriceInputError] = useState(false)

  let startDateInitialVal = new Date()

  if (props.treatment?.start_date) {
    startDateInitialVal = DateTime.fromISO(props.treatment.start_date).toJSDate()
  }

  const [patient, setPatient] = useState(props.patient)
  const [startDate, setStartDate] = useState(startDateInitialVal)
  const [title, setTitle] = useState(props.treatment?.title)
  const [price, setPrice] = useState(props.treatment?.price.toString())
  const [finished, setFinished] = useState(props.treatment?.finished)

  const context = useContext(DataContext)

  if (!context) {
    return
  }

  let styleProps: StyleProps = {
    patientEditable: true,
    colors: colors,
  }

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newTreatmentRequest: TreatmentRequest = {
        start_date: DateTime.fromJSDate(startDate).toISODate()!,
        title: title!,
        patient_id: patient!.id,
        price: Number(price),
        finished: finished,
      }

      if (props.treatment) {
        newTreatmentRequest.id = props.treatment.id
      }

      DeviceEventEmitter.emit('treatmentSaved', newTreatmentRequest)
    }
  }, [patient, startDate, title, price, finished])

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

  function handlePriceChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowPriceInputError(false)
    setPrice(event.nativeEvent.text.replace(',', '.'))
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

  function handleFinishedChange() {
    setFinished(!finished)
  }

  return (
    <MainView>
      <DateTimeInput text='Start date' showDatePicker={true} datetime={startDate} onChange={handleStartDateChange} />
      <MyInput placeholder='Title' value={title} showError={showTitleInputError} onChange={handleTitleChange} />
      <MyInput
        placeholder='Price'
        value={price}
        showError={showPriceInputError}
        onChange={handlePriceChange}
        keyboardType='decimal-pad'
        rightIcon={<CustomIcon name='manat' color={colors.text} size={20} />}
      />
      <MyInput
        placeholder='Choose patient'
        onPressIn={handlePatientChange}
        value={getSelectedPatientFullName()}
        editable={false}
        style={styles(styleProps).patient}
        showError={showPatientInputError}
      />
      <CheckBox
        checked={finished ?? false}
        onPress={handleFinishedChange}
        title='Finished'
        checkedColor='green'
        containerStyle={styles(styleProps).checkbox}
        textStyle={styles(styleProps).checkboxText}
      />
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