import { useNavigation, useTheme } from '@react-navigation/native'
import { ListItem } from '@rneui/themed'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { DeviceEventEmitter, StyleSheet } from 'react-native'
import { Colors } from '../types/Colors'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'

type Props = {
  patientName: string
  pageName: keyof RootStackParamList
  preventDefault?: boolean
}

export default function PatientItem(props: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

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
    if (props.preventDefault) {
      DeviceEventEmitter.emit('patientSelected', patient)
    } else {
      navigation.navigate('Patient', { patient: patient })
    }
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
