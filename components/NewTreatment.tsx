import { View, StyleSheet, Text, DeviceEventEmitter } from 'react-native';
import { Colors } from '../types/Colors';
import { useTheme } from '@react-navigation/native';
import MyInput from './MyInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';

export default function NewTreatment({ navigation }: any) {
  const { colors } = useTheme();
  const [patient, setPatient] = useState<string>();

  useEffect(() => {
    DeviceEventEmitter.addListener('patientSelected', handlePatientSelect);

    return () => {
      DeviceEventEmitter.removeAllListeners('patientSelected');
    };
  }, []);

  return (
    <View style={styles(colors).mainView}>
      <View style={styles(colors).dateTimeContainer}>
        <Text style={styles(colors).text}>Start date</Text>
        <View style={styles(colors).dateTime}>
          <DateTimePicker mode='date' value={new Date()} />
        </View>
      </View>
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

const styles = (colors: Colors) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
    },
    dateTimeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      marginHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 15,
    },
    text: {
      color: colors.text,
      fontSize: 18,
    },
    dateTime: {
      flexDirection: 'row',
    },
  });
