import { FAB, FABProps } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../types/Colors';

export default function MyFAB(props: FABProps) {
  const { colors } = useTheme();

  return (
    <FAB
      {...props}
      icon={{ name: 'add', color: colors.text }}
      placement='right'
      color={colors.primary}
      style={styles(colors).fab}
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
