import MySearchBar from './MySearchBar'
import TreatmentList from './TreatmentList'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'

export default function Treatments({ route }: RootStackScreenProps<'Treatments'>) {
  const preventDefault = route.params?.preventDefault

  return (
    <MainView>
      <MySearchBar />
      <TreatmentList pageName='Treatments' preventDefault={preventDefault} />
    </MainView>
  )
}
