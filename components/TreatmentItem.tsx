import { View, StyleSheet, DeviceEventEmitter } from 'react-native'
import { Chip, ListItem } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { getPatientFullName } from '../helpers/PatientHelper'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Treatment } from '../modals/Treatment'
import { treatmentFinished } from '../helpers/TreatmentHelper'
import IonIcons from '@expo/vector-icons/Ionicons'
import { Status } from '../enums/Status'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { TranslationKeys, translate } from '../helpers/Translator'

export type TreatmentItemProps = {
  treatment: Treatment
  pageName: keyof RootStackParamList
}

type StyleProps = {
  themeContext: ThemeContextType
  finished: boolean
}

export default function TreatmentItem(props: TreatmentItemProps) {
  const themeContext = useContext(ThemeContext)!
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const context = useContext(DataContext)

  const styleProps: StyleProps = {
    themeContext: themeContext,
    finished: treatmentFinished(props.treatment),
  }

  const patient = context?.patients?.find((p) => p.id === props.treatment.patient_id)
  const status = styleProps.finished ? Status.FINISHED : Status.ONGOING

  return (
    <TouchableHighlight onPress={() => handleTreatmentSelect(props.treatment)}>
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
              title={translate(status.toLowerCase() as keyof TranslationKeys)}
              type='outline'
              titleStyle={styles(styleProps).status}
              buttonStyle={styles(styleProps).statusButton}
            />
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableHighlight>
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
