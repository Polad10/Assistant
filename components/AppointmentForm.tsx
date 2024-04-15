import { NativeSyntheticEvent, TextInputChangeEventData, DeviceEventEmitter, View, Text } from 'react-native'
import DateInput, { DateInputRefType } from './DateInput'
import TimeInput, { TimeInputRefType } from './TimeInput'
import MyInput from './MyInput'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Treatment } from '../models/Treatment'
import { Appointment, AppointmentRequest } from '../models/Appointment'
import { DateTime } from 'luxon'
import HeaderButton from './HeaderButton'
import CreateButton from './CreateButton'
import TouchableInput from './TouchableInput'
import TouchableWithoutFeedbackInput from './TouchableWithoutFeedbackInput'
import { Patient } from '../models/Patient'
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView'
import { showDangerMessage } from '../helpers/ToastHelper'
import Toast from 'react-native-root-toast'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ThemeContext } from '../contexts/ThemeContext'
import { AppointmentStatus } from '../enums/AppointmentStatus'
import StatusChip from './StatusChip'

type Props = {
  pageName: keyof RootStackParamList
  appointment?: Appointment
  treatment?: Treatment
  patient?: Patient
}

export default function AppointmentForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!
  const themeContext = useContext(ThemeContext)!

  const translator = localizationContext.translator

  let treatment = props.treatment
  let appointment = props.appointment
  const patient = props.patient

  if (appointment) {
    treatment = dataContext.treatments?.find((t) => t.id === appointment?.treatment_id)
  }

  const treatmentEditable = !treatment
  const statusEditable = (appointment && appointment.datetime >= DateTime.local().toISODate()!) ?? false
  const initialDateTime = appointment ? new Date(appointment.datetime) : undefined

  const [showActionsInputError, setShowActionsInputError] = useState(false)
  const [showTreatmentInputError, setShowTreatmentInputError] = useState(false)
  const [showDatePickerError, setShowDatePickerError] = useState(false)
  const [showTimePickerError, setShowTimePickerError] = useState(false)

  const [actions, setActions] = useState(appointment?.actions ?? undefined)
  const [selectedTreatment, setSelectedTreatment] = useState(treatment)
  const [status, setStatus] = useState(appointment?.status)

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
        status: status,
      }

      if (appointment) {
        newAppointmentRequest.id = appointment.id
      }

      DeviceEventEmitter.emit('appointmentSaved', newAppointmentRequest)
    } else {
      showDangerMessage(translator.translate('fillInAllRequiredFields'), Toast.positions.TOP)
    }
  }, [actions, selectedTreatment, status])

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

  function handleStatusChange(status: AppointmentStatus) {
    if (statusEditable) {
      setStatus(status)
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
        headerRight: () => <HeaderButton title={translator.translate('save')} onPress={handleSave} />,
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

  function StatusInput() {
    if (status) {
      return (
        <>
          <Text style={{ marginBottom: 5, color: themeContext.info, fontSize: 15, fontWeight: 'bold' }}>
            {translator.translate('status')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
              borderWidth: 1,
              borderColor: themeContext.border,
              borderRadius: 10,
            }}
          >
            <StatusChip
              title={translator.translate('expected')}
              color={themeContext.defaultStatus}
              selected={status === AppointmentStatus.Expected}
              pressable={statusEditable}
              onPress={() => handleStatusChange(AppointmentStatus.Expected)}
            />
            <StatusChip
              title={translator.translate('cancelled')}
              color={themeContext.warning}
              selected={status === AppointmentStatus.Cancelled}
              pressable={statusEditable}
              onPress={() => handleStatusChange(AppointmentStatus.Cancelled)}
            />
            <StatusChip
              title={translator.translate('finished')}
              color={themeContext.success}
              selected={status === AppointmentStatus.Finished}
              pressable={statusEditable}
              onPress={() => handleStatusChange(AppointmentStatus.Finished)}
            />
          </View>
        </>
      )
    }

    return undefined
  }

  return (
    <MainView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <MyKeyboardAvoidingView>
        <View style={{ flexDirection: 'row' }}>
          <DateInput
            ref={dateInputRef}
            style={{ flex: 1, marginRight: 5 }}
            label={translator.translate('date')}
            placeholder={DateTime.local().toISODate() ?? undefined}
            date={initialDateTime}
            showError={showDatePickerError}
            onChange={() => setShowDatePickerError(false)}
          />
          <TimeInput
            ref={timeInputRef}
            style={{ flex: 1, marginLeft: 5 }}
            label={translator.translate('time')}
            placeholder={DateTime.local().toLocaleString(DateTime.TIME_24_SIMPLE) ?? undefined}
            time={initialDateTime}
            showError={showTimePickerError}
            onChange={() => setShowTimePickerError(false)}
          />
        </View>
        <MyInput
          label={translator.translate('actions')}
          placeholder={`${translator.translate('enterActions')}`}
          multiline={true}
          value={actions}
          onChange={handleActionsChange}
          showError={showActionsInputError}
          style={{ minHeight: 100 }}
          returnKeyType='default'
        />

        {treatmentEditable ? (
          <TouchableInput
            onPress={handleTreatmentChange}
            label={translator.translate('treatment')}
            placeholder={translator.translate('selectTreatment')}
            value={selectedTreatment?.title}
            showError={showTreatmentInputError}
          />
        ) : (
          <TouchableWithoutFeedbackInput
            label={translator.translate('treatment')}
            placeholder={translator.translate('selectTreatment')}
            value={selectedTreatment?.title}
            showError={showTreatmentInputError}
          />
        )}

        <StatusInput />
      </MyKeyboardAvoidingView>
      {!appointment && <CreateButton onPress={handleSave} />}
    </MainView>
  )
}
