import { View, StyleSheet } from 'react-native';
import DateTimeInput from './DateTimeInput';
import MyInput from './MyInput';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../types/Colors';
import { Mode } from '../enums/Mode';

type Props = {
  treatment?: string;
  mode: Mode;
};

export default function Appointment(props: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles(colors).mainView}>
      <DateTimeInput text='Date and time' showDatePicker={true} showTimePicker={true} />
      <MyInput placeholder='Actions' multiline={true} />
      <MyInput
        placeholder='Select treatment'
        onPressIn={() => (props.mode === Mode.NEW ? navigation.navigate('Treatments') : null)}
        value={props.treatment}
        editable={false}
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
    buttonCore: {
      margin: 10,
    },
  });
