import { StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Input } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../types/Colors';

type Props = {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
};

export default function MyInput(props: Props) {
  const { colors } = useTheme();

  return (
    <Input
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      multiline={props.multiline}
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
