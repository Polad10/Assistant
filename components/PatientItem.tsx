import { useNavigation, useTheme } from '@react-navigation/native'
import { ListItem } from '@rneui/themed'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { DeviceEventEmitter, StyleSheet } from 'react-native'
import { Colors } from '../types/Colors'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { getPatientFullName } from '../helpers/PatientHelper'
import Patient from '@polad10/assistant-models/Patient'

type Props = {
  patient: Patient
  pageName: keyof RootStackParamList
  preventDefault?: boolean
}

export default function PatientItem(props: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  return (
    <TouchableHighlight onPress={() => handlePatientSelect(props.patient)}>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitle}>{getPatientFullName(props.patient)}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableHighlight>
  )

  function handlePatientSelect(patient: Patient) {
    if (props.preventDefault) {
      DeviceEventEmitter.emit('patientSelected', patient)
    } else {
      navigation.navigate('Patient', { patientId: patient.id })
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
