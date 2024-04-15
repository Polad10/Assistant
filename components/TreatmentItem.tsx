import { View, StyleSheet, DeviceEventEmitter, TouchableOpacity } from 'react-native'
import { Chip, ListItem } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { Swipeable } from 'react-native-gesture-handler'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { getPatientFullName } from '../helpers/PatientHelper'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Treatment } from '../models/Treatment'
import { treatmentFinished } from '../helpers/TreatmentHelper'
import IonIcons from '@expo/vector-icons/Ionicons'
import { Status } from '../enums/Status'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { TranslationKeys } from '../localization/TranslationKeys'
import ItemActionDelete from './ItemActions/ItemActionDelete'
import { showDangerMessage } from '../helpers/ToastHelper'

export type TreatmentItemProps = {
  treatment: Treatment
  pageName: keyof RootStackParamList
}

type StyleProps = {
  themeContext: ThemeContextType
  finished: boolean
}

export default function TreatmentItem(props: TreatmentItemProps) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  const themeContext = useContext(ThemeContext)!
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  const styleProps: StyleProps = {
    themeContext: themeContext,
    finished: treatmentFinished(props.treatment),
  }

  const patient = dataContext.patients?.find((p) => p.id === props.treatment.patient_id)
  const status = styleProps.finished ? Status.FINISHED : Status.ONGOING

  async function deleteTreatment() {
    try {
      DeviceEventEmitter.emit('loading')

      await dataContext.deleteTreatment(props.treatment.id)

      showDangerMessage(translator.translate('treatmentDeleted'))
    } catch (ex) {
      showDangerMessage(translator.translate('somethingWentWrongMessage'))
    } finally {
      DeviceEventEmitter.emit('loadingFinished')
    }
  }

  function rightActions() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <ItemActionDelete onPress={deleteTreatment} />
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={rightActions}>
      <View style={{ backgroundColor: themeContext.primary }}>
        <TouchableOpacity onPress={() => handleTreatmentSelect(props.treatment)}>
          <ListItem containerStyle={styles(styleProps).listItemContainer}>
            <ListItem.Content>
              <ListItem.Title style={styles(styleProps).listItemTitle}>{props.treatment.title}</ListItem.Title>
              <View style={styles(styleProps).listItemStatus}>
                <View style={styles(styleProps).listItemRow}>
                  <ListItem.Subtitle style={[styles(styleProps).listItemSubtitle, styles(styleProps).infoIcon]}>
                    <IonIcons name='person-outline' size={14} />
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={[styles(styleProps).listItemSubtitle, styles(styleProps).patient]}>
                    {getPatientFullName(patient)}
                  </ListItem.Subtitle>
                </View>
                <Chip
                  title={translator.translate(status.toLowerCase() as keyof TranslationKeys)}
                  type='outline'
                  titleStyle={styles(styleProps).status}
                  buttonStyle={styles(styleProps).statusButton}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </View>
    </Swipeable>
  )

  function handleTreatmentSelect(treatment: Treatment) {
    if (DeviceEventEmitter.listenerCount('treatmentSelected') > 0) {
      DeviceEventEmitter.emit('treatmentSelected', treatment)
    } else {
      navigation.navigate('Treatment', { treatmentId: treatment.id })
    }
  }
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: styleProps.themeContext.primary,
    },
    listItemTitle: {
      color: styleProps.themeContext.neutral,
    },
    listItemSubtitle: {
      color: styleProps.themeContext.neutral,
      opacity: 0.5,
    },
    listItemStatus: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    status: {
      color: styleProps.finished ? 'lightgreen' : 'orange',
    },
    statusButton: {
      borderColor: styleProps.finished ? 'lightgreen' : 'orange',
    },
    infoIcon: {
      marginRight: 10,
    },
    patient: {
      opacity: 0.6,
    },
  })
