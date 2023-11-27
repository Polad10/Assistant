import { useTheme } from '@react-navigation/native'
import { Button, ButtonProps } from '@rneui/themed'
import { DeviceEventEmitter, SafeAreaView, StyleSheet } from 'react-native'

export default function CreateButton(props: ButtonProps) {
  const { colors } = useTheme()

  function handleSave() {
    DeviceEventEmitter.emit('entityCreate')
  }

  return (
    <SafeAreaView style={styles.buttonView}>
      <Button
        {...props}
        color={colors.primary}
        style={styles.button}
        buttonStyle={styles.buttonStyle}
        onPress={handleSave}
      >
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
