import { useTheme } from '@react-navigation/native'
import { Divider, ListItem } from '@rneui/themed'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../types/Colors'
import { RootStackParamList } from '../types/Navigation'
import { Patient } from '../modals/Patient'
import PatientList from './PatientList'

interface Props {
  sectionTiTle: string
  patients: Patient[]
  pageName: keyof RootStackParamList
}

export default function PatientListSection(props: Props) {
  const { colors } = useTheme()

  return (
    <View>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitleCategory}>{props.sectionTiTle}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Divider color={colors.border} style={styles(colors).divider} />
      <PatientList pageName={props.pageName} patients={props.patients} />
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
