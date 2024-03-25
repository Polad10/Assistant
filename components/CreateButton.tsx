import { Button, ButtonProps } from '@rneui/themed'
import { useContext } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ThemeContext } from '../contexts/ThemeContext'
import { LocalizationContext } from '../contexts/LocalizationContext'

export default function CreateButton(props: ButtonProps) {
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  return (
    <SafeAreaView style={styles.buttonView}>
      <Button {...props} color={themeContext.accent} style={styles.button} buttonStyle={styles.buttonStyle}>
        {translator.translate('create')}
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 'auto',
  },
  button: {
    marginHorizontal: 10,
  },
  buttonStyle: {
    padding: 10,
    borderRadius: 10,
  },
})
