import { useNavigation, useTheme } from '@react-navigation/native'
import { ListItem } from '@rneui/themed'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { DeviceEventEmitter, StyleSheet } from 'react-native'
import { Colors } from '../types/Colors'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { getPatientFullName } from '../helpers/PatientHelper'
import { Patient } from '../modals/Patient'

type Props = {
  patient: Patient
  pageName: keyof RootStackParamList
}

export default function PatientItem(props: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  return (
    <TouchableHighlight onPress={() => handlePatientSelect(props.patient)}>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).defaultText}>{getPatientFullName(props.patient)}</ListItem.Title>
          <ListItem.Subtitle style={styles(colors).subTitle}>{props.patient.extra_info}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableHighlight>
  )

  function handlePatientSelect(patient: Patient) {
    if (DeviceEventEmitter.listenerCount('patientSelected') > 0) {
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
    defaultText: {
      color: colors.text,
    },
    subTitle: {
      marginTop: 5,
      color: 'grey',
    },
  })
