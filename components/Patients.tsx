import MyFAB from './MyFAB'
import MySearchBar, { SearchBarRefType } from './MySearchBar'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { DataContext } from '../contexts/DataContext'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Patient } from '../modals/Patient'
import { DeviceEventEmitter } from 'react-native'
import PatientList from './PatientList'
import { searchPatients } from '../helpers/Searcher'
import { sortPatients } from '../helpers/PatientHelper'
import NoPatients from './user-messages/NoPatients'
import { translate } from '../helpers/Translator'
import LoadingView from './LoadingView'

export default function Patients({ navigation, route }: RootStackScreenProps<'Patients'>) {
  const context = useContext(DataContext)!

  const searchEventName = 'searchPatient'

  const [patientsInitial, setPatientsInitial] = useState<Patient[]>([])
  const [patients, setPatients] = useState<Patient[]>([])

  const ref = useRef<SearchBarRefType>()

  const handleSearch = useCallback(
    (search: string) => {
      const foundPatients = searchPatients(patientsInitial, search)

      setPatients(foundPatients)
    },
    [patientsInitial]
  )

  function getPatientsContentView() {
    if (context.loading) {
      return <LoadingView />
    } else if (patientsInitial.length > 0) {
      return (
        <MainView>
          <MySearchBar
            placeholder={`${translate('enterPatientName')}...`}
            searchEventName={searchEventName}
            ref={ref}
          />
          <PatientList pageName='Patients' patients={patients} />
          <MyFAB onPress={() => navigation.navigate('NewPatient')} />
        </MainView>
      )
    } else {
      return <NoPatients pageName='Patients' />
    }
  }

  useEffect(() => {
    ref.current?.clear()

    const patientsInitial = sortPatients(context.patients ?? [])

    setPatientsInitial(patientsInitial)
    setPatients(patientsInitial)
  }, [context.patients])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(searchEventName, handleSearch)

    return () => {
      listener.remove()
    }
  }, [handleSearch])

  return <MainView>{getPatientsContentView()}</MainView>
}
