import MySearchBar from './MySearchBar'
import TreatmentList from './TreatmentList'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext, TreatmentsType } from '../contexts/DataContext'
import Fuse from 'fuse.js'
import { DeviceEventEmitter } from 'react-native'

export default function Treatments({ route }: RootStackScreenProps<'Treatments'>) {
  const context = useContext(DataContext)

  const [treatments, setTreatments] = useState<TreatmentsType>([])
  const [treatmentsInitial, setTreatmentsInitial] = useState<TreatmentsType>([])

  if (!context) {
    return
  }

  const searchOptions = {
    keys: ['first_name', 'last_name'],
  }

  const fuse = new Fuse(context.patients ?? [], searchOptions)

  const handleSearch = useCallback(
    (search: string) => {
      if (!search) {
        setTreatments(treatmentsInitial)
        return
      }

      const foundPatients = fuse.search(search).map((s) => s.item)
      const foundTreatments = treatments?.filter((t) => foundPatients.some((p) => t.patient_id === p.id)) ?? []

      setTreatments(foundTreatments)
    },
    [treatments, treatmentsInitial]
  )

  useEffect(() => {
    context.fetchTreatments()
    context.fetchPatients()

    let ongoingTreatments = context?.treatments?.filter((t) => !t.finished)
    ongoingTreatments?.sort((t1, t2) => t2.start_date.localeCompare(t1.start_date))

    setTreatments(ongoingTreatments ?? [])
    setTreatmentsInitial(ongoingTreatments ?? [])
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('search', handleSearch)

    return () => {
      listener.remove()
    }
  }, [handleSearch])

  return (
    <MainView>
      <MySearchBar />
      <TreatmentList pageName='Treatments' treatments={treatments ?? []} />
    </MainView>
  )
}
