import { View, StyleSheet } from 'react-native';
import MySearchBar from './MySearchBar';
import TreatmentList from './TreatmentList';

export default function Treatments() {
  return (
    <View style={styles.mainView}>
      <MySearchBar />
      <TreatmentList pageName='Treatments' />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
