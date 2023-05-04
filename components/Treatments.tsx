import { View, StyleSheet } from 'react-native';
import MyFAB from './MyFAB';
import MySearchBar from './MySearchBar';
import { RootStackScreenProps } from '../types/Navigation';
import TreatmentGroup from './TreatmentGroup';

export default function Treatments({ navigation }: RootStackScreenProps<'Treatments'>) {
  return (
    <View style={styles.mainView}>
      <MySearchBar />
      <TreatmentGroup />
      <MyFAB onPress={() => navigation.navigate('NewTreatment')} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
