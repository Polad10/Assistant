import { Button, ButtonProps } from '@rneui/themed'
import { useContext } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ThemeContext } from '../contexts/ThemeContext'

export default function CreateButton(props: ButtonProps) {
  const themeContext = useContext(ThemeContext)!

  return (
    <SafeAreaView style={styles.buttonView}>
      <Button {...props} color={themeContext.accent} style={styles.button} buttonStyle={styles.buttonStyle}>
        Create
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 10,
  },
  buttonStyle: {
    padding: 10,
    borderRadius: 10,
  },
})
