import MySearchBar from './MySearchBar'
import TreatmentList from './TreatmentList'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useContext, useEffect } from 'react'
import { DataContext } from '../contexts/DataContext'

export default function Treatments({ route }: RootStackScreenProps<'Treatments'>) {
  const context = useContext(DataContext)

  useEffect(() => {
    context!.fetchTreatments()
    context!.fetchPatients()
  }, [])

  let ongoingTreatments = context?.treatments?.filter((t) => !t.finished)
  ongoingTreatments?.sort((t1, t2) => t2.start_date.localeCompare(t1.start_date))

  return (
    <MainView>
      <MySearchBar />
      <TreatmentList pageName='Treatments' treatments={ongoingTreatments} />
    </MainView>
  )
}
