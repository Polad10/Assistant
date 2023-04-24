import { View } from 'react-native';
import PatientGroup from './PatientGroup';
import MyFAB from './MyFAB';
import MySearchBar from './MySearchBar';
import { RootStackScreenProps } from '../types/Navigation';

export default function Patients({ navigation }: RootStackScreenProps<'Patients'>) {
  return (
    <View style={{ flex: 1 }}>
      <MySearchBar />
      <PatientGroup />
      <MyFAB onPress={() => navigation.navigate('NewPatient')} />
    </View>
  );
}
