import { View, StyleSheet, Text } from 'react-native';
import { Input } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../types/Colors';

export default function NewAppointment() {
  const { colors } = useTheme();

  return (
    <View style={styles(colors).modal}>
      <Input placeholder='First name' inputStyle={styles(colors).input} />
      <Input placeholder='Last name' inputStyle={styles(colors).input} />
      <Input placeholder='City' inputStyle={styles(colors).input} />
      <Input placeholder='Phone number' keyboardType='phone-pad' inputStyle={styles(colors).input} />
      <Input placeholder='Extra info' multiline={true} inputStyle={styles(colors).input} />
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    modal: {
      flex: 1,
    },
    input: {
      color: colors.text,
    },
  });
