import { FAB } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Alert, GestureResponderEvent } from 'react-native';
import { Colors } from '../types/Colors';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

export default function MyFAB(props: Props) {
  const { colors } = useTheme();

  return (
    <FAB
      icon={{ name: 'add', color: colors.text }}
      placement='right'
      color={colors.primary}
      style={styles(colors).fab}
      onPress={props.onPress}
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
