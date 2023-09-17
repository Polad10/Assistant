import PatientList from './PatientList'
import MyFAB from './MyFAB'
import MySearchBar from './MySearchBar'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Patients({ navigation, route }: RootStackScreenProps<'Patients'>) {
  const preventDefault = route.params?.preventDefault
  const pageName = route.params?.pageName
  const [patients, setPatients] = useState<Patient[]>([])

  async function getPatients() {
    const patients = (await axios.get<Patient[]>('http://192.168.1.236:3000/patients')).data

    setPatients(patients)
  }

  useEffect(() => {
    getPatients()
  }, [])

  return (
    <MainView>
      <MySearchBar />
      <PatientList pageName={pageName ?? 'Patients'} preventDefault={preventDefault} patients={patients} />
      <MyFAB onPress={() => navigation.navigate('NewPatient')} />
    </MainView>
  )
}
