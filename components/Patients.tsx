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
import NoPatients from './user-messages/NoPatients'
import LoadingView from './LoadingView'
import Error from './user-messages/Error'
import { translate } from '../helpers/Translator'

export default function Patients({ navigation, route }: RootStackScreenProps<'Patients'>) {
  const context = useContext(DataContext)!

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      await context.fetchTreatments()
      await context.fetchPayments()
      await context.fetchAppointments()
      await context.fetchPatients()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  async function retryAfterError() {
    setError(false)
    await fetchData()
  }

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
    if (error) {
      return <Error onBtnPress={retryAfterError} />
    } else if (loading) {
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
