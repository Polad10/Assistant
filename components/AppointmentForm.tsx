import { NativeSyntheticEvent, TextInputChangeEventData, DeviceEventEmitter } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useNavigation, useTheme } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Treatment } from '@polad10/assistant-models/Treatment'
import { Appointment, AppointmentRequest } from '@polad10/assistant-models/Appointment'
import { DateTime } from 'luxon'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import IonIcons from '@expo/vector-icons/Ionicons'
import HeaderButton from './HeaderButton'
import CreateButton from './CreateButton'

type Props = {
  pageName: keyof RootStackParamList
  appointment?: Appointment
  treatment?: Treatment
}

export default function AppointmentForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const context = useContext(DataContext)
  const { colors } = useTheme()

  if (!context) {
    return
  }

  let treatment = props.treatment
  let appointment = props.appointment

  if (appointment) {
    treatment = context.treatments?.find((t) => t.id === appointment?.treatment_id)
  }

  const treatmentEditable = !treatment

  const initialDateTime = appointment ? new Date(appointment.datetime) : undefined

  const [showActionsInputError, setShowActionsInputError] = useState(false)
  const [showTreatmentInputError, setShowTreatmentInputError] = useState(false)
  const [showDatePickerError, setShowDatePickerError] = useState(false)
  const [showTimePickerError, setShowTimePickerError] = useState(false)

  const [dateFilled, setDateFilled] = useState(!!initialDateTime)
  const [timeFilled, setTimeFilled] = useState(!!initialDateTime)

  const [dateTime, setDateTime] = useState<Date | undefined>(initialDateTime)
  const [actions, setActions] = useState(appointment?.actions ?? undefined)
  const [selectedTreatment, setSelectedTreatment] = useState(treatment)

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newAppointmentRequest: AppointmentRequest = {
        datetime: DateTime.fromJSDate(dateTime!).toISO()!,
        actions: actions,
        treatment_id: selectedTreatment!.id,
      }

      if (appointment) {
        newAppointmentRequest.id = appointment.id
      }

      DeviceEventEmitter.emit('appointmentSaved', newAppointmentRequest)
    }
  }, [dateTime, actions, selectedTreatment])

  function validate() {
    let valid = true

    if (!actions) {
      valid = false
      setShowActionsInputError(true)
    }

    if (!selectedTreatment) {
      valid = false
      setShowTreatmentInputError(true)
    }

    if (!dateFilled) {
      valid = false
      setShowDatePickerError(true)
    }

    if (!timeFilled) {
      valid = false
      setShowTimePickerError(true)
    }

    return valid
  }

  function handleActionsChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowActionsInputError(false)
    setActions(event.nativeEvent.text)
  }

  function handleTreatmentSelect(treatment: Treatment) {
    // first navigate, then set appointment
    // avoids reseting appointment
    navigation.navigate('NewAppointment')

    setShowTreatmentInputError(false)
    setSelectedTreatment(treatment)
  }

  function handleTreatmentChange() {
    if (treatmentEditable) {
      navigation.navigate('Treatments')
    }
  }

  function handleDateChange(date: Date) {
    if (!dateTime) {
      setDateTime(date)
    } else {
      const currentDateTime = DateTime.fromJSDate(dateTime)
      const newDateTime = DateTime.fromJSDate(date).set({ hour: currentDateTime.hour, minute: currentDateTime.minute })

      setDateTime(newDateTime.toJSDate())
    }

    setShowDatePickerError(false)
    setDateFilled(true)
  }

  function handleTimeChange(time: Date) {
    if (!dateTime) {
      setDateTime(time)
    } else {
      const currentDateTime = DateTime.fromJSDate(dateTime)
      const newDateTime = DateTime.fromJSDate(time).set({
        year: currentDateTime.year,
        month: currentDateTime.month,
        day: currentDateTime.day,
      })

      setDateTime(newDateTime.toJSDate())
    }

    setShowTimePickerError(false)
    setTimeFilled(true)
  }

  function getTreatmentInput() {
    return (
      <MyInput
        pointerEvents='none'
        label='Treatment'
        placeholder='Select'
        value={selectedTreatment?.title}
        showError={showTreatmentInputError}
        rightIcon={
          treatmentEditable ? (
            <IonIcons name='chevron-forward-outline' size={25} color={colors.notification} />
          ) : undefined
        }
        disabled={!treatmentEditable}
      />
    )
  }

  useEffect(() => {
    if (appointment) {
      navigation.setOptions({
        headerRight: () => <HeaderButton title='Save' onPress={handleSave} />,
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

  return (
    <MainView style={{ paddingTop: 20 }}>
      <DateTimeInput
        text='Date and time'
        datetime={dateTime}
        showDatePicker={true}
        showTimePicker={true}
        showDatePickerError={showDatePickerError}
        showTimePickerError={showTimePickerError}
        onDateChange={handleDateChange}
        onTimeChange={handleTimeChange}
      />
      <MyInput
        label='Actions'
        placeholder='Enter actions...'
        multiline={true}
        value={actions}
        onChange={handleActionsChange}
        showError={showActionsInputError}
        style={{ minHeight: 100 }}
      />

      {treatmentEditable ? (
        <TouchableOpacity onPress={handleTreatmentChange}>{getTreatmentInput()}</TouchableOpacity>
      ) : (
        <TouchableWithoutFeedback>{getTreatmentInput()}</TouchableWithoutFeedback>
      )}

      {!appointment && <CreateButton onPress={handleSave} />}
    </MainView>
  )
}
