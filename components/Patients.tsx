import MyFAB from './MyFAB'
import MySearchBar, { SearchBarRefType } from './MySearchBar'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { DataContext } from '../contexts/DataContext'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Patient } from '../modals/Patient'
import { DeviceEventEmitter, View } from 'react-native'
import PatientList from './PatientList'
import { searchPatients } from '../helpers/Searcher'
import { sortPatients } from '../helpers/PatientHelper'
import NoPatients from './no-data/NoPatients'
import LoadingView from './LoadingView'

export default function Patients({ navigation, route }: RootStackScreenProps<'Patients'>) {
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)

      await context.fetchTreatments()
      await context.fetchPayments()
      await context.fetchAppointments()
      await context.fetchPatients()

      setLoading(false)
    }

    fetch()
  }, [])

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
    if (loading) {
      return <LoadingView />
    } else if (patientsInitial.length > 0) {
      return (
        <MainView>
          <MySearchBar placeholder='Enter patient name...' searchEventName={searchEventName} ref={ref} />
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
