import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useNavigation } from '@react-navigation/native'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'
import { Button } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainView from './MainView'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'

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
  const datetime = appointment ? new Date(appointment.datetime) : new Date()

  if (props.mode === Mode.NEW) {
    treatment = props.treatment
  }

  return (
    <MainView>
      <DateTimeInput text='Date and time' datetime={datetime} showDatePicker={true} showTimePicker={true} />
      <MyInput placeholder='Actions' multiline={true} value={appointment?.actions} />
      <MyInput
        placeholder='Select treatment'
        onPressIn={() => (props.mode === Mode.NEW ? navigation.navigate('Treatments', { preventDefault: true }) : null)}
        value={treatment?.title}
        editable={false}
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
