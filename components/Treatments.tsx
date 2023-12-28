import MySearchBar, { SearchBarRefType } from './MySearchBar'
import TreatmentList from './TreatmentList'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { DeviceEventEmitter } from 'react-native'
import { getOngoingTreatments, treatmentFinished } from '../helpers/TreatmentHelper'
import { TreatmentWithPatientName } from '../types/TreatmentWithPatientName'
import { searchTreatments } from '../helpers/Searcher'

export default function Treatments({ route }: RootStackScreenProps<'Treatments'>) {
  const context = useContext(DataContext)
  const searchEventName = 'searchTreatment'

  const [treatments, setTreatments] = useState<TreatmentWithPatientName[]>([])
  const [treatmentsInitial, setTreatmentsInitial] = useState<TreatmentWithPatientName[]>([])

  if (!context) {
    return
  }

  const ref = useRef<SearchBarRefType>()

  const handleSearch = useCallback(
    (search: string) => {
      const foundTreatments = searchTreatments(treatmentsInitial, search)

      setTreatments(foundTreatments)
    },
    [treatmentsInitial]
  )

  useEffect(() => {
    context.fetchTreatments()
    context.fetchPatients()
  }, [])

  useEffect(() => {
    ref.current?.clear()

    const ongoingTreatments = getOngoingTreatments(context.treatments ?? [])

    const treatmentsWithPatientName: TreatmentWithPatientName[] =
      ongoingTreatments?.map((t) => {
        const patient = context.patients?.find((p) => p.id === t.patient_id)

        return {
          patientFirstName: patient?.first_name,
          patientLastName: patient?.last_name,
          ...t,
        }
      }) ?? []

    setTreatments(treatmentsWithPatientName)
    setTreatmentsInitial(treatmentsWithPatientName)
  }, [context.treatments])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(searchEventName, handleSearch)

    return () => {
      listener.remove()
    }
  }, [handleSearch])

  return (
    <MainView>
      <MySearchBar searchEventName={searchEventName} ref={ref} />
      <TreatmentList pageName='Treatments' treatments={treatments ?? []} />
    </MainView>
  )
}
