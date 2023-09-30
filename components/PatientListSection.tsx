import { useTheme } from '@react-navigation/native'
import { Divider, ListItem } from '@rneui/themed'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../types/Colors'
import PatientItem from './PatientItem'
import { RootStackParamList } from '../types/Navigation'

interface Props {
  sectionTiTle: string
  patients: Patient[]
  preventDefault?: boolean
  pageName: keyof RootStackParamList
}

export default function PatientListSection(props: Props) {
  const { colors } = useTheme()

  const patientElements = props.patients.map((p) => (
    <View key={p.id}>
      <PatientItem patient={p} preventDefault={props.preventDefault} pageName={props.pageName} />
      <Divider color={colors.border} style={styles(colors).divider} />
    </View>
  ))

  return (
    <View>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitleCategory}>{props.sectionTiTle}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Divider color={colors.border} style={styles(colors).divider} />
      {patientElements}
    </View>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: colors.background,
    },
    listItemTitleCategory: {
      color: colors.text,
      opacity: 0.5,
    },
    divider: {
      marginHorizontal: 13,
    },
  })
