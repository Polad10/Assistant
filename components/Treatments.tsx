import { View, StyleSheet } from 'react-native'
import MySearchBar from './MySearchBar'
import TreatmentList from './TreatmentList'
import { RootStackScreenProps } from '../types/Navigation'

export default function Treatments({ route }: RootStackScreenProps<'Treatments'>) {
  return (
    <View style={styles.mainView}>
      <MySearchBar />
      <TreatmentList pageName='Treatments' preventDefault={route.params?.preventDefault} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
})
