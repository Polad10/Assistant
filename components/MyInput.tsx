import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData } from 'react-native'
import { Input, InputProps } from '@rneui/themed'
import { useContext, useState } from 'react'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'

type StyleProps = {
  themeContext: ThemeContextType
  showError?: boolean
}

type Props = InputProps & {
  showError?: boolean
}

export default function MyInput(props: Props) {
  const themeContext = useContext(ThemeContext)!
  const [focused, setFocused] = useState(false)

  const styleProps: StyleProps = {
    themeContext: themeContext,
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
      rightIconContainerStyle={{ marginRight: 10, paddingRight: 0 }}
      inputStyle={styles(styleProps).input}
      labelStyle={styles(styleProps).label}
      inputContainerStyle={[focused ? styles(styleProps).focused : null, styles(styleProps).inputContainer]}
      containerStyle={{ paddingHorizontal: 0 }}
      selectionColor={props.selectionColor || themeContext.neutral}
      onFocus={handleFocus}
      onBlur={() => setFocused(false)}
      renderErrorMessage={false}
      returnKeyType={props.returnKeyType || 'done'}
      autoCorrect={false}
    />
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    input: {
      color: styleProps.themeContext.neutral,
    },
    label: {
      marginBottom: 5,
      color: styleProps.themeContext.info,
    },
    inputContainer: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: styleProps.showError ? 'red' : styleProps.themeContext.border,
      marginBottom: 20,
    },
    focused: {
      borderColor: 'grey',
    },
  })
