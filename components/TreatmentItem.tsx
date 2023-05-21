import { View, StyleSheet, DeviceEventEmitter } from 'react-native'
import { ListItem } from '@rneui/themed'
import { Colors } from '../types/Colors'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Status } from '../enums/Status'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'

export type TreatmentItemProps = {
  description: string
  patientName: string
  startDate: Date
  status: Status
  preventDefault?: boolean
  pageName: keyof RootStackParamList
}

type StyleProps = {
  colors: Colors
  status: Status
}

export default function TreatmentItem(props: TreatmentItemProps) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  const styleProps: StyleProps = {
    colors: colors,
    status: props.status,
  }

  return (
    <TouchableHighlight onPress={() => handleTreatmentSelect(props.description)}>
      <ListItem containerStyle={styles(styleProps).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(styleProps).listItemTitle}>{props.description}</ListItem.Title>
          <ListItem.Subtitle style={styles(styleProps).listItemSubtitle}>
            Patient: {props.patientName}
          </ListItem.Subtitle>
          <View style={styles(styleProps).listItemStatus}>
            <ListItem.Subtitle style={styles(styleProps).listItemSubtitle}>
              Start date: {props.startDate.toLocaleDateString()}
            </ListItem.Subtitle>
            <View style={styles(styleProps).listItemRow}>
              <ListItem.Subtitle style={styles(styleProps).listItemSubtitle}>Status: </ListItem.Subtitle>
              <ListItem.Subtitle style={[styles(styleProps).listItemSubtitle, styles(styleProps).statusColor]}>
                {props.status}
              </ListItem.Subtitle>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableHighlight>
  )

  function handleTreatmentSelect(treatment: string) {
    if (props.preventDefault) {
      DeviceEventEmitter.emit('treatmentSelected', treatment)
    } else {
      navigation.navigate('Treatment', {
        treatment: treatment,
        patientName: 'Polad Mammadov',
        startDate: new Date().toLocaleDateString(),
        status: Status.ONGOING,
      })
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
      color: styleProps.status == Status.ONGOING ? 'orange' : 'lightgreen',
    },
  })
