import { View, StyleSheet, DeviceEventEmitter } from 'react-native'
import { ListItem } from '@rneui/themed'
import { Colors } from '../types/Colors'
import { useNavigation, useTheme } from '@react-navigation/native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { getPatientFullName } from '../helpers/PatientHelper'
import { DateTime } from 'luxon'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Treatment } from '@polad10/assistant-models/Treatment'

export type TreatmentItemProps = {
  treatment: Treatment
  pageName: keyof RootStackParamList
}

type StyleProps = {
  colors: Colors
  finished: boolean
}

export default function TreatmentItem(props: TreatmentItemProps) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const context = useContext(DataContext)

  const styleProps: StyleProps = {
    colors: colors,
    finished: props.treatment.finished,
  }

  const patient = context?.patients?.find((p) => p.id === props.treatment.patient_id)

  return (
    <TouchableHighlight onPress={() => handleTreatmentSelect(props.treatment)}>
      <ListItem containerStyle={styles(styleProps).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(styleProps).listItemTitle}>{props.treatment.title}</ListItem.Title>
          <ListItem.Subtitle style={styles(styleProps).listItemSubtitle}>
            Patient: {getPatientFullName(patient)}
          </ListItem.Subtitle>
          <View style={styles(styleProps).listItemStatus}>
            <ListItem.Subtitle style={styles(styleProps).listItemSubtitle}>
              Start date: {DateTime.fromISO(props.treatment.start_date).toISODate()}
            </ListItem.Subtitle>
            <View style={styles(styleProps).listItemRow}>
              <ListItem.Subtitle style={styles(styleProps).listItemSubtitle}>Status: </ListItem.Subtitle>
              <ListItem.Subtitle style={[styles(styleProps).listItemSubtitle, styles(styleProps).statusColor]}>
                {props.treatment.finished ? 'Finished' : 'Ongoing'}
              </ListItem.Subtitle>
            </View>
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
      backgroundColor: styleProps.colors.background,
    },
    listItemTitle: {
      color: styleProps.colors.text,
      marginBottom: 15,
    },
    listItemSubtitle: {
      color: styleProps.colors.text,
      opacity: 0.5,
    },
    listItemStatus: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    listItemRow: {
      flexDirection: 'row',
    },
    statusColor: {
      color: styleProps.finished ? 'lightgreen' : 'orange',
    },
  })
