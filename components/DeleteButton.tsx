import { useTheme } from '@react-navigation/native'
import { Button, Dialog } from '@rneui/themed'
import { useState } from 'react'
import { DeviceEventEmitter, SafeAreaView, StyleSheet } from 'react-native'

export default function DeleteButton() {
  const { colors } = useTheme()
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)

  function handleDelete() {
    setConfirmDialogVisible(false)
    DeviceEventEmitter.emit('entityDeleted')
  }

  function toggleConfirmDialogVisible() {
    setConfirmDialogVisible(!confirmDialogVisible)
  }

  return (
    <SafeAreaView style={styles.buttonView}>
      <Button titleStyle={{ color: 'red' }} style={styles.button} type='clear' onPress={toggleConfirmDialogVisible}>
        Delete
      </Button>
      <Dialog
        isVisible={confirmDialogVisible}
        onBackdropPress={toggleConfirmDialogVisible}
        overlayStyle={{ backgroundColor: colors.card }}
      >
        <Dialog.Title title='Delete the record?' titleStyle={{ color: 'red' }} />
        <Dialog.Actions>
          <Dialog.Button title='CONFIRM' onPress={handleDelete} />
          <Dialog.Button title='CANCEL' onPress={toggleConfirmDialogVisible} />
        </Dialog.Actions>
      </Dialog>
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
})
