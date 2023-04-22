import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import MyInput from './MyInput';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../types/Colors';
import { useEffect, useState } from 'react';
import DateTimeInput from './DateTimeInput';

export default function NewAppointment({ navigation }: any) {
  const { colors } = useTheme();
  const [treatment, setTreatment] = useState<string>();

  useEffect(() => {
    DeviceEventEmitter.addListener('treatmentSelected', handleTreatmentSelect);

    return () => {
      DeviceEventEmitter.removeAllListeners('treatmentSelected');
    };
  }, []);

  return (
    <View style={styles(colors).mainView}>
      <DateTimeInput text='Date and time' showDatePicker={true} showTimePicker={true} />
      <MyInput placeholder='Actions' multiline={true} />
      <MyInput
        placeholder='Select treatment'
        onPressIn={() => navigation.navigate('Treatments')}
        value={treatment}
        editable={false}
      />
    </View>
  );

  function handleTreatmentSelect(treatment: string) {
    navigation.goBack();
    setTreatment(treatment);
  }
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
    },
    button: {
      borderColor: colors.primary,
    },
    buttonTitle: {
      color: colors.primary,
    },
    buttonCore: {
      margin: 10,
    },
  });
