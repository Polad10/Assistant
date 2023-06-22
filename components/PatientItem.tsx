import { useTheme } from '@react-navigation/native'
import { ListItem } from '@rneui/themed'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { DeviceEventEmitter, StyleSheet } from 'react-native'
import { Colors } from '../types/Colors'

type Props = {
  patientName: string
}

export default function PatientItem(props: Props) {
  const { colors } = useTheme()

  return (
    <TouchableHighlight onPress={() => handlePatientSelect(props.patientName)}>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitle}>{props.patientName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableHighlight>
  )

  function handlePatientSelect(patient: string) {
    DeviceEventEmitter.emit('patientSelected', patient)
  }
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: colors.background,
    },
    listItemTitle: {
      color: colors.text,
    },
  })
