import { StyleSheet } from 'react-native';
import { Input, InputProps } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../types/Colors';

export default function MyInput(props: InputProps) {
  const { colors } = useTheme();

  return (
    <Input
      {...props}
      inputStyle={styles(colors).input}
      inputContainerStyle={styles(colors).inputContainer}
      containerStyle={styles(colors).container}
    />
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    input: {
      color: colors.text,
    },
    inputContainer: {
      borderColor: colors.border,
    },
    container: {
      height: 50,
    },
  });
