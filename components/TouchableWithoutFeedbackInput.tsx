import { InputProps } from '@rneui/themed'
import MyInput from './MyInput'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

type Props = InputProps & {
  showError?: boolean
}

export default function TouchableInput(props: Props) {
  return (
    <TouchableWithoutFeedback>
      <MyInput {...props} pointerEvents='none' disabled={true} />
    </TouchableWithoutFeedback>
  )
}
