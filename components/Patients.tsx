import MyFAB from './MyFAB'
import MySearchBar, { SearchBarRefType } from './MySearchBar'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { DataContext } from '../contexts/DataContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { Patient } from '../modals/Patient'
import { DeviceEventEmitter } from 'react-native'
import PatientList from './PatientList'
import { searchPatients } from '../helpers/Searcher'

export default function Patients({ navigation, route }: RootStackScreenProps<'Patients'>) {
  const context = useContext(DataContext)
  const searchEventName = 'searchPatient'

  const [patients, setPatients] = useState<Patient[]>(context?.patients ?? [])

  if (!context) {
    return
  }

  const ref = useRef<SearchBarRefType>()

  function handleSearch(search: string) {
    const foundPatients = searchPatients(context?.patients ?? [], search)

    setPatients(foundPatients)
  }

  function getPatientsContentView() {
    return <PatientList pageName='Patients' patients={patients} />
  }

  useEffect(() => {
    ref.current?.clear()
    setPatients(context.patients ?? [])
  }, [context.patients])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(searchEventName, handleSearch)

    return () => {
      listener.remove()
    }
  }, [handleSearch])

  return (
    <MainView>
      <MySearchBar searchEventName={searchEventName} ref={ref} />
      {getPatientsContentView()}
      <MyFAB onPress={() => navigation.navigate('NewPatient')} />
    </MainView>
  )
}
