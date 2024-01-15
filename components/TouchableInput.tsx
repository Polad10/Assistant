import { InputProps } from '@rneui/themed'
import MyInput from './MyInput'
import { TouchableOpacity } from 'react-native'
import IonIcons from '@expo/vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'

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
      rightIcon={<IonIcons name='chevron-forward-outline' size={25} color={colors.notification} />}
    />
  )
}
