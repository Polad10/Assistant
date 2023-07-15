import { View } from 'react-native'
import PatientList from './PatientList'
import MyFAB from './MyFAB'
import MySearchBar from './MySearchBar'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'

export default function Patients({ navigation }: RootStackScreenProps<'Patients'>) {
  return (
    <MainView>
      <MySearchBar />
      <PatientList />
      <MyFAB onPress={() => navigation.navigate('NewPatient')} />
    </MainView>
  )
}
