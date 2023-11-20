import { NativeSyntheticEvent, TextInputChangeEventData, DeviceEventEmitter } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Treatment } from '@polad10/assistant-models/Treatment'
import HeaderButton from './HeaderButton'
import { AppointmentRequest } from '@polad10/assistant-models/Appointment'
import { DateTime } from 'luxon'
import DeleteButton from './DeleteButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IonIcons from '@expo/vector-icons/Ionicons'

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

    //validate datetime

    return valid
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title='Save' onPress={handleSave} />,
    })
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

  return (
    <MainView style={{ paddingTop: 20 }}>
      <DateTimeInput
        text='Date and time'
        datetime={dateTime}
        showDatePicker={true}
        showTimePicker={true}
        onChange={setDateTime}
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
      <TouchableOpacity onPress={handleTreatmentChange}>
        <MyInput
          pointerEvents='none'
          label='Treatment'
          placeholder='Select'
          value={selectedTreatment?.title}
          showError={showTreatmentInputError}
          rightIcon={<IonIcons name='chevron-forward-outline' size={25} color={colors.notification} />}
        />
      </TouchableOpacity>
      {props.mode === Mode.EDIT && <DeleteButton />}
    </MainView>
  )
}
