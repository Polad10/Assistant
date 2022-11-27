import { FAB } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Alert } from 'react-native';
import { Colors } from '../types/Colors';

export default function MyFAB() {
  const { colors } = useTheme();

  function fabPressed() {
    Alert.alert('fab pressed');
  }

  return (
    <FAB
      icon={{ name: 'add' }}
      placement='right'
      color={colors.primary}
      style={styles(colors).fab}
      onPress={fabPressed}
    />
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    fab: {
      marginRight: 20,
      marginBottom: 30,
    },
  });
