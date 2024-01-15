import { InputProps } from '@rneui/themed'
import MyInput from './MyInput'
import IonIcons from '@expo/vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'
import { FontAwesome6 } from '@expo/vector-icons'

type Props = InputProps & {
  showError?: boolean
  onPress: () => void
}

export default function TouchableInput(props: Props) {
  const { colors } = useTheme()

  return (
    <MyInput
      {...props}
      showSoftInputOnFocus={false}
      onFocus={props.onPress}
      selectionColor='transparent'
      rightIcon={<FontAwesome6 name='chevron-right' size={20} color={colors.notification} />}
    />
  )
}
