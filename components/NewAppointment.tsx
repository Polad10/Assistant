import { View, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewAppointment() {
  return (
    <View style={styles.modal}>
      <DateTimePicker mode='date' value={new Date()} />
      <Text>HELOOOOOOO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
});
