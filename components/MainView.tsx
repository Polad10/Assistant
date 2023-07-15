import { PropsWithChildren } from 'react'
import { TouchableWithoutFeedback, View, StyleSheet, Keyboard } from 'react-native'

export default function MainView({ children }: PropsWithChildren) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainView}>{children}</View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
})
