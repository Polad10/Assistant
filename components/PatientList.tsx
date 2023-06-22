import { View, StyleSheet, DeviceEventEmitter } from 'react-native'
import { ListItem, Divider } from '@rneui/themed'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import PatientItem from './PatientItem'
import { RootStackScreenProps } from '../types/Navigation'
import { useEffect } from 'react'

export default function PatientList() {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<'Patients'>['navigation']>()

  useEffect(() => {
    DeviceEventEmitter.addListener('patientSelected', handlePatientSelect)

    return () => {
      DeviceEventEmitter.removeAllListeners('patientSelected')
    }
  }, [])

  return (
    <View>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitleCategory}>P</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Divider color={colors.border} style={styles(colors).divider} />
      <PatientItem patientName='Polad Mammmadov' />
      <Divider color={colors.border} style={styles(colors).divider} />
    </View>
  )

  function handlePatientSelect(patient: string) {
    navigation.navigate('Patient', { patient: patient })
  }
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
