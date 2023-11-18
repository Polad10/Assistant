import MySearchBar, { SearchBarRefType } from './MySearchBar'
import TreatmentList from './TreatmentList'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import Fuse from 'fuse.js'
import { DeviceEventEmitter } from 'react-native'
import { Treatment } from '@polad10/assistant-models/Treatment'

interface TreatmentWithPatientName extends Treatment {
  patientFirstName?: string
  patientLastName?: string
}

export default function Treatments({ route }: RootStackScreenProps<'Treatments'>) {
  const context = useContext(DataContext)
  const searchEventName = 'searchTreatment'

  const [treatments, setTreatments] = useState<TreatmentWithPatientName[]>([])
  const [treatmentsInitial, setTreatmentsInitial] = useState<TreatmentWithPatientName[]>([])

  if (!context) {
    return
  }

  const ref = useRef<SearchBarRefType>()

  const searchOptions = {
    keys: [
      {
        name: 'patientFirstName',
        weight: 2,
      },
      {
        name: 'patientLastName',
        weight: 1,
      },
    ],
  }

  const fuse = new Fuse(treatmentsInitial, searchOptions)

  const handleSearch = useCallback(
    (search: string) => {
      if (!search) {
        setTreatments(treatmentsInitial)
        return
      }

      const foundTreatments = fuse.search(search).map((s) => s.item)

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

    const ongoingTreatments = context.treatments?.filter((t) => !t.finished)
    ongoingTreatments?.sort((t1, t2) => t2.start_date.localeCompare(t1.start_date))

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
