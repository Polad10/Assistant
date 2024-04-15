import { useNavigation } from '@react-navigation/native'
import { ListItem } from '@rneui/themed'
import { Swipeable, TouchableHighlight } from 'react-native-gesture-handler'
import { DeviceEventEmitter, StyleSheet, TouchableOpacity, View } from 'react-native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { getPatientFullName } from '../helpers/PatientHelper'
import { Patient } from '../models/Patient'
import { useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import ItemActionDelete from './ItemActions/ItemActionDelete'
import { DataContext } from '../contexts/DataContext'
import { showDangerMessage } from '../helpers/ToastHelper'
import { LocalizationContext } from '../contexts/LocalizationContext'

type Props = {
  patient: Patient
  pageName: keyof RootStackParamList
}

export default function PatientItem(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const themeContext = useContext(ThemeContext)!
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  function rightActions() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <ItemActionDelete onPress={deletePatient} />
      </View>
    )
  }

  async function deletePatient() {
    try {
      DeviceEventEmitter.emit('loading')

      await dataContext.deletePatient(props.patient.id)

      showDangerMessage(translator.translate('patientDeleted'))
    } catch (ex) {
      showDangerMessage(translator.translate('somethingWentWrongMessage'))
    } finally {
      DeviceEventEmitter.emit('loadingFinished')
    }
  }

  return (
    <Swipeable renderRightActions={rightActions}>
      <View style={{ backgroundColor: themeContext.primary, paddingVertical: 10 }}>
        <TouchableOpacity onPress={() => handlePatientSelect(props.patient)}>
          <ListItem containerStyle={styles(themeContext).listItemContainer}>
            <ListItem.Content>
              <ListItem.Title style={styles(themeContext).defaultText}>
                {getPatientFullName(props.patient)}
              </ListItem.Title>
              {props.patient.extra_info && (
                <ListItem.Subtitle style={styles(themeContext).subTitle}>{props.patient.extra_info}</ListItem.Subtitle>
              )}
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </View>
    </Swipeable>
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
