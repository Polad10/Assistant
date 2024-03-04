import { ReactNode, useContext } from 'react'
import { TouchableWithoutFeedback, View, StyleSheet, Keyboard, ViewStyle } from 'react-native'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'

type Props = {
  children: ReactNode
  style?: ViewStyle
}

export default function MainView(props: Props) {
  const themeContext = useContext(ThemeContext)!

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles(themeContext).mainView, props.style]}>{props.children}</View>
    </TouchableWithoutFeedback>
  )
}

const styles = (themeContext: ThemeContextType) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: themeContext.primary,
      paddingTop: 20,
      paddingHorizontal: 10,
    },
  })
