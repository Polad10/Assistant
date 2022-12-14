import { View } from 'react-native';
import PatientGroup from './PatientGroup';
import MyFAB from './MyFAB';
import MySearchBar from './MySearchBar';

export default function Patients({ navigation }: any) {
  return (
    <View style={{ flex: 1 }}>
      <MySearchBar />
      <PatientGroup />
      <MyFAB onPress={() => navigation.navigate('NewPatient')} />
    </View>
  );
}
