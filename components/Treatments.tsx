import { View, StyleSheet } from 'react-native'
import MySearchBar from './MySearchBar'
import TreatmentList from './TreatmentList'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'

export default function Treatments({ route }: RootStackScreenProps<'Treatments'>) {
  return (
    <MainView>
      <MySearchBar />
      <TreatmentList pageName='Treatments' preventDefault={route.params?.preventDefault} />
    </MainView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
})
