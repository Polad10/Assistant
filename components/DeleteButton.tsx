import { Button } from '@rneui/themed'
import { DeviceEventEmitter, SafeAreaView, StyleSheet } from 'react-native'

export default function DeleteButton() {
  function handleDelete() {
    DeviceEventEmitter.emit('entityDeleted')
  }

  return (
    <SafeAreaView style={styles.buttonView}>
      <Button color='red' style={styles.button} onPress={handleDelete}>
        Delete
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
})
