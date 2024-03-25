import { useActionSheet } from '@expo/react-native-action-sheet'
import { Button } from '@rneui/themed'
import { useContext } from 'react'
import { DeviceEventEmitter, SafeAreaView, StyleSheet } from 'react-native'
import { ThemeContext } from '../contexts/ThemeContext'
import { LocalizationContext } from '../contexts/LocalizationContext'

export default function DeleteButton() {
  const { showActionSheetWithOptions } = useActionSheet()
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  function handleDelete() {
    DeviceEventEmitter.emit('entityDeleted')
  }

  function promptToConfirm() {
    const options = [translator.translate('delete'), translator.translate('cancel')]
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 1

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        showSeparators: true,
        containerStyle: { backgroundColor: themeContext.secondary },
        textStyle: { color: themeContext.neutral },
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            handleDelete()
        }
      }
    )
  }

  return (
    <SafeAreaView>
      <Button titleStyle={{ color: themeContext.warning }} style={styles.button} type='clear' onPress={promptToConfirm}>
        {translator.translate('delete')}
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
  },
})
