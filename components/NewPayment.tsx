import { View } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'

export default function NewPayment() {
  return (
    <View>
      <DateTimeInput text='Date' showDatePicker={true} />
      <MyInput keyboardType='numeric' />
    </View>
  )
}
