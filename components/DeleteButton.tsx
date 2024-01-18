import { useActionSheet } from '@expo/react-native-action-sheet'
import { useTheme } from '@react-navigation/native'
import { Button } from '@rneui/themed'
import { DeviceEventEmitter, SafeAreaView, StyleSheet } from 'react-native'

export default function DeleteButton() {
  const { showActionSheetWithOptions } = useActionSheet()
  const { colors } = useTheme()

  function handleDelete() {
    DeviceEventEmitter.emit('entityDeleted')
  }

  function promptToConfirm() {
    const options = ['Delete', 'Cancel']
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 1

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        showSeparators: true,
        containerStyle: { backgroundColor: colors.card },
        textStyle: { color: colors.text },
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
      <Button titleStyle={{ color: 'red' }} style={styles.button} type='clear' onPress={promptToConfirm}>
        Delete
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
  },
})
