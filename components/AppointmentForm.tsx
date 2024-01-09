import { NativeSyntheticEvent, TextInputChangeEventData, DeviceEventEmitter, View } from 'react-native'
import DateInput, { DateInputRefType } from './DateInput'
import TimeInput, { TimeInputRefType } from './TimeInput'
import MyInput from './MyInput'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Treatment } from '../modals/Treatment'
import { Appointment, AppointmentRequest } from '../modals/Appointment'
import { DateTime } from 'luxon'
import HeaderButton from './HeaderButton'
import CreateButton from './CreateButton'
import TouchableInput from './TouchableInput'
import TouchableWithoutFeedbackInput from './TouchableWithoutFeedbackInput'
import { Patient } from '../modals/Patient'
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView'

type Props = {
  pageName: keyof RootStackParamList
  appointment?: Appointment
  treatment?: Treatment
  patient?: Patient
}

export default function AppointmentForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  let treatment = props.treatment
  let appointment = props.appointment
  const patient = props.patient

  if (appointment) {
    treatment = context.treatments?.find((t) => t.id === appointment?.treatment_id)
  }

  const treatmentEditable = !treatment

  const initialDateTime = appointment ? new Date(appointment.datetime) : undefined

  const [showActionsInputError, setShowActionsInputError] = useState(false)
  const [showTreatmentInputError, setShowTreatmentInputError] = useState(false)
  const [showDatePickerError, setShowDatePickerError] = useState(false)
  const [showTimePickerError, setShowTimePickerError] = useState(false)

  const [actions, setActions] = useState(appointment?.actions ?? undefined)
  const [selectedTreatment, setSelectedTreatment] = useState(treatment)

  const [focusedInputIndex, setFocusedInputIndex] = useState(0)

  const dateInputRef = useRef<DateInputRefType>()
  const timeInputRef = useRef<TimeInputRefType>()

  const handleSave = useCallback(async () => {
    if (validate()) {
      const date = dateInputRef.current?.getDate()
      const time = timeInputRef.current?.getTime()

      const dateTime = combineDateTime(date!, time!)

      const newAppointmentRequest: AppointmentRequest = {
        datetime: DateTime.fromJSDate(dateTime).toISO()!,
        actions: actions,
        treatment_id: selectedTreatment!.id,
      }

      if (appointment) {
        newAppointmentRequest.id = appointment.id
      }

      DeviceEventEmitter.emit('appointmentSaved', newAppointmentRequest)
    }
  }, [actions, selectedTreatment])

  function validate() {
    let valid = true

    const date = dateInputRef.current?.getDate()
    const time = timeInputRef.current?.getTime()

    if (!actions) {
      valid = false
      setShowActionsInputError(true)
    }

    if (!selectedTreatment) {
      valid = false
      setShowTreatmentInputError(true)
    }

    if (!date) {
      valid = false
      setShowDatePickerError(true)
    }

    if (!time) {
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
    navigation.navigate('NewAppointment', { patient: patient })

    setShowTreatmentInputError(false)
    setSelectedTreatment(treatment)
  }

  function handleTreatmentChange() {
    if (treatmentEditable) {
      navigation.navigate('Treatments', { patient: patient })
    }
  }

  function combineDateTime(date: Date, time: Date) {
    const dateObj = DateTime.fromJSDate(date)
    const timeObj = DateTime.fromJSDate(time)

    const dateTime = dateObj.set({ hour: timeObj.hour, minute: timeObj.minute })

    return dateTime.toJSDate()
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
    <MyKeyboardAvoidingView focusedInputIndex={focusedInputIndex}>
      <MainView style={{ paddingTop: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <DateInput
            ref={dateInputRef}
            style={{ flex: 1 }}
            label='Date'
            placeholder='Pick a date'
            date={initialDateTime}
            showError={showDatePickerError}
            onChange={() => setShowDatePickerError(false)}
            onFocus={() => setFocusedInputIndex(0)}
          />
          <TimeInput
            ref={timeInputRef}
            style={{ flex: 1 }}
            label='Time'
            placeholder='Pick a time'
            time={initialDateTime}
            showError={showTimePickerError}
            onChange={() => setShowTimePickerError(false)}
            onFocus={() => setFocusedInputIndex(0)}
          />
        </View>
        <MyInput
          label='Actions'
          placeholder='Enter actions...'
          multiline={true}
          value={actions}
          onChange={handleActionsChange}
          showError={showActionsInputError}
          style={{ minHeight: 100 }}
          onFocus={() => setFocusedInputIndex(1)}
        />

        {treatmentEditable ? (
          <TouchableInput
            onPress={handleTreatmentChange}
            label='Treatment'
            placeholder='Select'
            value={selectedTreatment?.title}
            showError={showTreatmentInputError}
          />
        ) : (
          <TouchableWithoutFeedbackInput
            label='Treatment'
            placeholder='Select'
            value={selectedTreatment?.title}
            showError={showTreatmentInputError}
          />
        )}

        {!appointment && <CreateButton onPress={handleSave} />}
      </MainView>
    </MyKeyboardAvoidingView>
  )
}
