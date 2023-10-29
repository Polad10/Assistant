import { ReactNode } from 'react'
import { TouchableWithoutFeedback, View, StyleSheet, Keyboard, ViewStyle } from 'react-native'

type Props = {
  children: ReactNode
  style?: ViewStyle
}

export default function MainView(props: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[props.style, styles.mainView]}>{props.children}</View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
})
