import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../types/Colors';
import MyInput from './MyInput';

export default function NewAppointment() {
  const { colors } = useTheme();

  return (
    <View style={styles(colors).modal}>
      <MyInput placeholder='First name' />
      <MyInput placeholder='Last name' />
      <MyInput placeholder='City' />
      <MyInput placeholder='Phone number' keyboardType='phone-pad' />
      <MyInput placeholder='Extra info' multiline={true} />
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    modal: {
      flex: 1,
    },
  });
