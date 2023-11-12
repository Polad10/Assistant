import PatientList from './PatientList'
import MyFAB from './MyFAB'
import MySearchBar from './MySearchBar'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { DataContext } from '../contexts/DataContext'
import { useContext, useEffect, useState } from 'react'
import { Patient } from '@polad10/assistant-models/Patient'
import Fuse from 'fuse.js'
import { DeviceEventEmitter } from 'react-native'

export default function Patients({ navigation, route }: RootStackScreenProps<'Patients'>) {
  const pageName = route.params?.pageName
  const context = useContext(DataContext)
  const searchEventName = 'searchPatient'

  const [patients, setPatients] = useState<Patient[]>(context?.patients ?? [])

  if (!context) {
    return
  }

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

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(searchEventName, handleSearch)

    return () => {
      listener.remove()
    }
  }, [handleSearch])

  return (
    <MainView>
      <MySearchBar searchEventName={searchEventName} />
      <PatientList pageName={pageName ?? 'Patients'} patients={patients} />
      <MyFAB onPress={() => navigation.navigate('NewPatient')} />
    </MainView>
  )
}
