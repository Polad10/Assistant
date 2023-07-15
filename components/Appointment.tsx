import { View, StyleSheet } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'
import { Button } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  treatment?: string
  mode: Mode
}

export default function Appointment(props: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()

  return (
    <View style={styles(colors).mainView}>
      <DateTimeInput text='Date and time' showDatePicker={true} showTimePicker={true} />
      <MyInput placeholder='Actions' multiline={true} />
      <MyInput
        placeholder='Select treatment'
        onPressIn={() => (props.mode === Mode.NEW ? navigation.navigate('Treatments', { preventDefault: true }) : null)}
        value={props.treatment}
        editable={false}
      />
      <SafeAreaView style={styles(colors).buttonView}>
        <Button color='red' style={styles(colors).button}>
          Delete
        </Button>
      </SafeAreaView>
    </View>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
    },
    buttonView: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    button: {
      marginHorizontal: 10,
    },
  })
