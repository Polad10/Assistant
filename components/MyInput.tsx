import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData } from 'react-native'
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

  function handleFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    props.onFocus?.(event)
    setFocused(true)
  }

  return (
    <Input
      {...props}
      style={[props.style, { paddingHorizontal: 10, paddingVertical: 20, paddingTop: props.multiline ? 15 : 20 }]}
      inputStyle={styles(styleProps).input}
      labelStyle={styles(styleProps).label}
      inputContainerStyle={[styles(styleProps).inputContainer, focused ? styles(styleProps).focused : null]}
      selectionColor={props.selectionColor || colors.notification}
      onFocus={handleFocus}
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
      borderRadius: 10,
      borderColor: styleProps.showError ? 'red' : styleProps.colors.border,
    },
    focused: {
      borderColor: 'grey',
    },
  })
