import { View, StyleSheet, Text, DeviceEventEmitter } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyInput from './MyInput';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../types/Colors';
import { useEffect, useState } from 'react';

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
      <View style={styles(colors).dateTimeContainer}>
        <Text style={styles(colors).text}>Date and time</Text>
        <View style={styles(colors).dateTime}>
          <DateTimePicker mode='date' value={new Date()} />
          <DateTimePicker mode='time' value={new Date()} style={styles(colors).timePicker} />
        </View>
      </View>
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
    timePicker: {
      marginLeft: 5,
    },
    buttonCore: {
      margin: 10,
    },
  });
