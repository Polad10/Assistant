import { StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, DeviceEventEmitter } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useNavigation } from '@react-navigation/native'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'
import { Button } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Treatment from '@polad10/assistant-models/Treatment'
import HeaderButton from './HeaderButton'

type Props = {
  appointmentId?: number
  mode: Mode
}

export default function Appointment(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()
  const context = useContext(DataContext)

  const appointment = context?.appointments?.find((a) => a.id === props.appointmentId)
  let treatment = context?.treatments?.find((t) => t.id === appointment?.treatment_id)

  const initialDateTime = appointment ? new Date(appointment.datetime) : new Date()

  const [showActionsInputError, setShowActionsInputError] = useState(false)
  const [showTreatmentInputError, setShowTreatmentInputError] = useState(false)
  const [dateTime, setDateTime] = useState(initialDateTime)
  const [actions, setActions] = useState(appointment?.actions)
  const [selectedTreatment, setSelectedTreatment] = useState(treatment)

  const handleSave = useCallback(() => {
    if (validate()) {
      console.log(dateTime)
      console.log(actions)
      console.log(selectedTreatment)
    }
  }, [dateTime, actions, selectedTreatment])

  function validate() {
    let valid = true

    if (!actions) {
      valid = false
      setShowActionsInputError(true)
    } else {
      setShowActionsInputError(false)
    }

    if (!selectedTreatment) {
      valid = false
      setShowTreatmentInputError(true)
    } else {
      setShowTreatmentInputError(false)
    }

    return valid
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title='Save' onPress={handleSave} />,
    })
  }, [navigation, handleSave])

  if (props.mode === Mode.NEW) {
    useEffect(() => {
      const listener = DeviceEventEmitter.addListener('treatmentSelected', handleTreatmentSelect)

      return () => {
        listener.remove()
      }
    }, [])
  }

  function handleDateTimeChange(event: DateTimePickerEvent, dateTime: Date | undefined) {
    if (dateTime) {
      setDateTime(dateTime)
    }
  }

  function handleActionsChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowActionsInputError(false)
    setActions(event.nativeEvent.text)
  }

  function handleTreatmentSelect(treatment: Treatment) {
    navigation.goBack()
    setShowTreatmentInputError(false)
    setSelectedTreatment(treatment)
  }

  return (
    <MainView>
      <DateTimeInput
        text='Date and time'
        datetime={dateTime}
        showDatePicker={true}
        showTimePicker={true}
        onChange={handleDateTimeChange}
      />
      <MyInput
        placeholder='Actions'
        multiline={true}
        value={actions}
        onChange={handleActionsChange}
        showError={showActionsInputError}
      />
      <MyInput
        placeholder='Select treatment'
        onPressIn={() => (props.mode === Mode.NEW ? navigation.navigate('Treatments', { preventDefault: true }) : null)}
        value={selectedTreatment?.title}
        editable={false}
        showError={showTreatmentInputError}
      />
      {props.mode === Mode.EDIT && (
        <SafeAreaView style={styles.buttonView}>
          <Button color='red' style={styles.button}>
            Delete
          </Button>
        </SafeAreaView>
      )}
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
