import { ScrollView } from 'react-native-gesture-handler'
import MainView from './MainView'
import { Patient } from '../modals/Patient'
import { StyleSheet, View } from 'react-native'
import PatientItem from './PatientItem'
import { Divider } from '@rneui/themed'
import { useTheme } from '@react-navigation/native'
import { RootStackParamList } from '../types/Navigation'
import NoDataFound from './NoDataView'

type Props = {
  patients: Patient[]
  pageName: keyof RootStackParamList
}

export default function PatientList(props: Props) {
  const { colors } = useTheme()

  const patientElements = props.patients.map((p) => (
    <View key={p.id}>
      <PatientItem patient={p} pageName={props.pageName} />
      <Divider color={colors.border} style={styles.divider} />
    </View>
  ))

  function getPatientsContentView() {
    if (patientElements.length > 0) {
      return (
        <ScrollView keyboardDismissMode='on-drag'>
          <MainView>{patientElements}</MainView>
        </ScrollView>
      )
    } else {
      return <NoDataFound text='No patients found' />
    }
  }

  return <MainView>{getPatientsContentView()}</MainView>
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 13,
  },
})
