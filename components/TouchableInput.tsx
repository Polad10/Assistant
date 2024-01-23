import { InputProps } from '@rneui/themed'
import MyInput from './MyInput'
import { FontAwesome6 } from '@expo/vector-icons'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

type Props = InputProps & {
  showError?: boolean
  onPress: () => void
}

export default function TouchableInput(props: Props) {
  const themeContext = useContext(ThemeContext)!

  return (
    <MyInput
      {...props}
      showSoftInputOnFocus={false}
      onFocus={props.onPress}
      selectionColor='transparent'
      rightIcon={<FontAwesome6 name='chevron-right' size={20} color={themeContext.neutral} />}
    />
  )
}
