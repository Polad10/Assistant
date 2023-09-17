import { View, StyleSheet } from 'react-native'
import { ListItem, Divider } from '@rneui/themed'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import PatientItem from './PatientItem'
import { RootStackParamList } from '../types/Navigation'

type Props = {
  pageName: keyof RootStackParamList
  preventDefault?: boolean
  patients: Patient[]
}

export default function PatientList(props: Props) {
  const { colors } = useTheme()

  const patientsJsx = props.patients.map((p) => (
    <View key={p.id}>
      <PatientItem
        patientName={getPatientFullName(p)}
        preventDefault={props.preventDefault}
        pageName={props.pageName}
      />
      <Divider color={colors.border} style={styles(colors).divider} />
    </View>
  ))

  function getPatientFullName(patient: Patient) {
    return `${patient.first_name} ${patient.last_name}`
  }

  return (
    <View>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitleCategory}>P</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Divider color={colors.border} style={styles(colors).divider} />
      {patientsJsx}
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
