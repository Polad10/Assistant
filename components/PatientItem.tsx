import { useNavigation } from '@react-navigation/native'
import { ListItem } from '@rneui/themed'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { DeviceEventEmitter, StyleSheet } from 'react-native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { getPatientFullName } from '../helpers/PatientHelper'
import { Patient } from '../modals/Patient'
import { useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'

type Props = {
  patient: Patient
  pageName: keyof RootStackParamList
}

export default function PatientItem(props: Props) {
  const themeContext = useContext(ThemeContext)!
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  return (
    <TouchableHighlight onPress={() => handlePatientSelect(props.patient)}>
      <ListItem containerStyle={styles(themeContext).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(themeContext).defaultText}>{getPatientFullName(props.patient)}</ListItem.Title>
          {props.patient.extra_info && (
            <ListItem.Subtitle style={styles(themeContext).subTitle}>{props.patient.extra_info}</ListItem.Subtitle>
          )}
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

const styles = (themeContext: ThemeContextType) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: themeContext.primary,
    },
    defaultText: {
      color: themeContext.neutral,
    },
    subTitle: {
      marginTop: 5,
      color: 'grey',
    },
  })
