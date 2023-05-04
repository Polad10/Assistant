import { View } from 'react-native';
import PatientList from './PatientList';
import MyFAB from './MyFAB';
import MySearchBar from './MySearchBar';
import { RootStackScreenProps } from '../types/Navigation';

export default function Patients({ navigation }: RootStackScreenProps<'Patients'>) {
  return (
    <View style={{ flex: 1 }}>
      <MySearchBar />
      <PatientList />
      <MyFAB onPress={() => navigation.navigate('NewPatient')} />
    </View>
  );
}
