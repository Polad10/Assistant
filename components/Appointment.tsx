import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useNavigation } from '@react-navigation/native'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'
import { Button } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainView from './MainView'

type Props = {
  treatment?: string
  mode: Mode
}

export default function Appointment(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()

  return (
    <MainView>
      <DateTimeInput text='Date and time' showDatePicker={true} showTimePicker={true} />
      <MyInput placeholder='Actions' multiline={true} />
      <MyInput
        placeholder='Select treatment'
        onPressIn={() => (props.mode === Mode.NEW ? navigation.navigate('Treatments', { preventDefault: true }) : null)}
        value={props.treatment}
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
