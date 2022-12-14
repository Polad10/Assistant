import { View, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyInput from './MyInput';
import { Button } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../types/Colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function NewAppointment({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <View style={styles(colors).mainView}>
      <TouchableWithoutFeedback style={styles(colors).touchable}>
        <Text style={styles(colors).text}>Date and time</Text>
        <View style={styles(colors).dateTimeView}>
          <DateTimePicker mode='date' value={new Date()} />
          <DateTimePicker mode='time' value={new Date()} style={styles(colors).timePicker} />
        </View>
      </TouchableWithoutFeedback>
      <MyInput placeholder='Actions' multiline={true} />
      <Button
        title='Choose the patient & service'
        color={colors.primary}
        type='outline'
        buttonStyle={styles(colors).button}
        titleStyle={styles(colors).buttonTitle}
        style={styles(colors).buttonCore}
        onPress={() => navigation.navigate('Treatments')}
      />
    </View>
  );
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
    touchable: {
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
    dateTimeView: {
      flexDirection: 'row',
    },
    timePicker: {
      marginLeft: 5,
    },
    buttonCore: {
      margin: 10,
    },
  });
