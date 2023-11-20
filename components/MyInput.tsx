import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import { Input, InputProps } from '@rneui/themed'
import { useState } from 'react'

type StyleProps = {
  colors: Colors
  showError?: boolean
}

type Props = InputProps & {
  showError?: boolean
}

export default function MyInput(props: Props) {
  const { colors } = useTheme()
  const [focused, setFocused] = useState(false)

  const styleProps: StyleProps = {
    colors: colors,
    showError: props.showError,
  }

  return (
    <Input
      {...props}
      inputStyle={styles(styleProps).input}
      labelStyle={styles(styleProps).label}
      inputContainerStyle={[styles(styleProps).inputContainer, focused ? styles(styleProps).focused : null]}
      selectionColor={colors.notification}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    input: {
      color: styleProps.colors.text,
    },
    label: {
      marginBottom: 5,
      color: styleProps.colors.notification,
    },
    inputContainer: {
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      borderColor: styleProps.showError ? 'red' : styleProps.colors.border,
    },
    focused: {
      borderColor: styleProps.colors.notification,
    },
  })
