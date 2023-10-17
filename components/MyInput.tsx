import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import { Input, InputProps } from '@rneui/themed'

type StyleProps = {
  colors: Colors
  showError?: boolean
}

type Props = InputProps & {
  showError?: boolean
}

export default function MyInput(props: Props) {
  const { colors } = useTheme()

  const styleProps: StyleProps = {
    colors: colors,
    showError: props.showError,
  }

  return (
    <Input {...props} inputStyle={styles(styleProps).input} inputContainerStyle={styles(styleProps).inputContainer} />
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    input: {
      color: styleProps.colors.text,
    },
    inputContainer: {
      borderColor: styleProps.showError ? 'red' : styleProps.colors.border,
    },
  })
