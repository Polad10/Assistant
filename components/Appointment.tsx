import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  DeviceEventEmitter,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Treatment } from '@polad10/assistant-models/Treatment'
import { AppointmentRequest } from '@polad10/assistant-models/Appointment'
import { DateTime } from 'luxon'
import DeleteButton from './DeleteButton'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import IonIcons from '@expo/vector-icons/Ionicons'
import { Button } from '@rneui/themed'
import HeaderButton from './HeaderButton'

type Props = {
  appointmentId?: number
  treatment?: Treatment
  mode: Mode
}

export default function Appointment(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()
  const context = useContext(DataContext)
  const { colors } = useTheme()

  if (!context) {
    return
  }

  const appointment = context.appointments?.find((a) => a.id === props.appointmentId)
  let treatment = props.treatment

  if (appointment) {
    treatment = context.treatments?.find((t) => t.id === appointment?.treatment_id)
  }

  const initialDateTime = appointment ? new Date(appointment.datetime) : undefined

  const [showActionsInputError, setShowActionsInputError] = useState(false)
  const [showTreatmentInputError, setShowTreatmentInputError] = useState(false)
  const [showDatePickerError, setShowDatePickerError] = useState(false)
  const [showTimePickerError, setShowTimePickerError] = useState(false)

  const [dateFilled, setDateFilled] = useState(false)
  const [timeFilled, setTimeFilled] = useState(false)

  const [dateTime, setDateTime] = useState<Date | undefined>(initialDateTime)
  const [actions, setActions] = useState(appointment?.actions ?? undefined)
  const [selectedTreatment, setSelectedTreatment] = useState(treatment)

  const handleSave = useCallback(async () => {
    if (validate()) {
      const newAppointment: AppointmentRequest = {
        datetime: DateTime.fromJSDate(dateTime!).toISO()!,
        actions: actions,
        treatment_id: selectedTreatment!.id,
      }

      if (props.mode === Mode.EDIT) {
        newAppointment.id = appointment?.id
        await context.updateAppointment(newAppointment)
      } else {
        await context.createAppointment(newAppointment)
      }

      navigation.goBack()
    }
  }, [dateTime, actions, selectedTreatment])

  const handleDelete = useCallback(async () => {
    if (appointment) {
      await context.deleteAppointment(appointment.id)

      navigation.goBack()
    }
  }, [])

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
    if (props.treatment || props.mode === Mode.EDIT) {
      return
    }

    navigation.navigate('Treatments')
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
          props.mode === Mode.NEW ? (
            <IonIcons name='chevron-forward-outline' size={25} color={colors.notification} />
          ) : undefined
        }
        disabled={props.treatment != null || props.mode === Mode.EDIT}
      />
    )
  }

  useEffect(() => {
    if (props.mode === Mode.EDIT) {
      navigation.setOptions({
        headerRight: () => <HeaderButton title='Save' onPress={handleSave} />,
      })
    }
  }, [navigation, handleSave])

  useEffect(() => {
    if (props.mode === Mode.NEW) {
      const treatmentSelectedListener = DeviceEventEmitter.addListener('treatmentSelected', handleTreatmentSelect)
      const treatmentCreatedListener = DeviceEventEmitter.addListener('treatmentCreated', handleTreatmentSelect)

      return () => {
        treatmentSelectedListener.remove()
        treatmentCreatedListener.remove()
      }
    } else {
      const treatmentDeleteListener = DeviceEventEmitter.addListener('entityDeleted', handleDelete)

      return () => {
        treatmentDeleteListener.remove()
      }
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
        placeholder='Type something...'
        multiline={true}
        value={actions}
        onChange={handleActionsChange}
        showError={showActionsInputError}
        style={{ minHeight: 100 }}
      />

      {props.treatment != null || props.mode === Mode.EDIT ? (
        <TouchableWithoutFeedback>{getTreatmentInput()}</TouchableWithoutFeedback>
      ) : (
        <TouchableOpacity onPress={handleTreatmentChange}>{getTreatmentInput()}</TouchableOpacity>
      )}

      {props.mode === Mode.NEW && (
        <SafeAreaView style={styles.buttonView}>
          <Button
            color={colors.primary}
            style={styles.button}
            buttonStyle={{ padding: 10, borderRadius: 10 }}
            onPress={handleSave}
          >
            Create Appointment
          </Button>
        </SafeAreaView>
      )}

      {props.mode === Mode.EDIT && <DeleteButton />}
    </MainView>
  )
}

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 10,
  },
})
