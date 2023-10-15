import { StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useNavigation } from '@react-navigation/native'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'
import { Button } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainView from './MainView'
import { useContext, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Treatment from '@polad10/assistant-models/Treatment'

type Props = {
  appointmentId?: number
  treatment?: Treatment
  mode: Mode
}

export default function Appointment(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()
  const context = useContext(DataContext)

  const appointment = context?.appointments?.find((a) => a.id === props.appointmentId)
  let treatment = context?.treatments?.find((t) => t.id === appointment?.treatment_id)

  const initialDateTime = appointment ? new Date(appointment.datetime) : new Date()

  const [dateTime, setDateTime] = useState(initialDateTime)
  const [actions, setActions] = useState(appointment?.actions)
  const [title, setTitle] = useState(treatment?.title)

  if (props.mode === Mode.NEW) {
    treatment = props.treatment
  }

  function handleDateTimeChange(event: DateTimePickerEvent, dateTime: Date | undefined) {
    if (dateTime) {
      setDateTime(dateTime)
    }
  }

  function handleActionsChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setActions(event.nativeEvent.text)
  }

  function handleTitleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setTitle(event.nativeEvent.text)
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
      <MyInput placeholder='Actions' multiline={true} value={actions} onChange={handleActionsChange} />
      <MyInput
        placeholder='Select treatment'
        onPressIn={() => (props.mode === Mode.NEW ? navigation.navigate('Treatments', { preventDefault: true }) : null)}
        value={title}
        editable={false}
        onChange={handleTitleChange}
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
