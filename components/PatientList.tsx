import { View, StyleSheet } from 'react-native'
import { ListItem, Divider } from '@rneui/themed'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import PatientItem from './PatientItem'
import { RootStackParamList } from '../types/Navigation'

type Props = {
  pageName: keyof RootStackParamList
  preventDefault?: boolean
}

export default function PatientList(props: Props) {
  const { colors } = useTheme()

  return (
    <View>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitleCategory}>P</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Divider color={colors.border} style={styles(colors).divider} />
      <PatientItem patientName='Polad Mammmadov' preventDefault={props.preventDefault} pageName={props.pageName} />
      <Divider color={colors.border} style={styles(colors).divider} />
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
