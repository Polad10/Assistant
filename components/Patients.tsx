import PatientList from './PatientList'
import MyFAB from './MyFAB'
import MySearchBar from './MySearchBar'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'

export default function Patients({ navigation, route }: RootStackScreenProps<'Patients'>) {
  const preventDefault = route.params?.preventDefault
  const pageName = route.params?.pageName

  return (
    <MainView>
      <MySearchBar />
      <PatientList pageName={pageName ?? 'Patients'} preventDefault={preventDefault} />
      <MyFAB onPress={() => navigation.navigate('NewPatient')} />
    </MainView>
  )
}
