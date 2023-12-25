import MyFAB from './MyFAB'
import MySearchBar, { SearchBarRefType } from './MySearchBar'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { DataContext } from '../contexts/DataContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { Patient } from '../modals/Patient'
import Fuse from 'fuse.js'
import { DeviceEventEmitter } from 'react-native'
import PatientList from './PatientList'

export default function Patients({ navigation, route }: RootStackScreenProps<'Patients'>) {
  const context = useContext(DataContext)
  const searchEventName = 'searchPatient'

  const [patients, setPatients] = useState<Patient[]>(context?.patients ?? [])

  if (!context) {
    return
  }

  const ref = useRef<SearchBarRefType>()

  const searchOptions = {
    keys: [
      {
        name: 'first_name',
        weight: 2,
      },
      {
        name: 'last_name',
        weight: 1,
      },
    ],
  }

  const fuse = new Fuse(context.patients ?? [], searchOptions)

  function handleSearch(search: string) {
    if (!search) {
      setPatients(context?.patients ?? [])
      return
    }

    const foundPatients = fuse.search(search).map((s) => s.item)

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
