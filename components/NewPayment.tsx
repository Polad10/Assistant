import { View } from 'react-native'
import DateTimeInput from './DateTimeInput'
import MyInput from './MyInput'
import { useTheme } from '@react-navigation/native'
import CustomIcon from './CustomIcon'

export default function NewPayment() {
  const { colors } = useTheme()

  return (
    <View>
      <DateTimeInput text='Date' showDatePicker={true} />
      <MyInput
        placeholder='Amount'
        keyboardType='numeric'
        rightIcon={<CustomIcon name='manat' color={colors.text} size={20} />}
      />
    </View>
  )
}
