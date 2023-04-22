import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import MyInput from './MyInput';
import { useEffect, useState } from 'react';
import DateTimeInput from './DateTimeInput';

export default function NewTreatment({ navigation }: any) {
  const [patient, setPatient] = useState<string>();

  useEffect(() => {
    DeviceEventEmitter.addListener('patientSelected', handlePatientSelect);

    return () => {
      DeviceEventEmitter.removeAllListeners('patientSelected');
    };
  }, []);

  return (
    <View style={styles().mainView}>
      <DateTimeInput text='Start date' showDatePicker={true} />
      <MyInput placeholder='Title' />
      <MyInput
        placeholder='Choose patient'
        onPressIn={() => navigation.navigate('Patients')}
        value={patient}
        editable={false}
      />
    </View>
  );

  function handlePatientSelect(patient: string) {
    navigation.goBack();
    setPatient(patient);
  }
}

const styles = () =>
  StyleSheet.create({
    mainView: {
      flex: 1,
    },
  });
