import { Colors } from '../types/Colors';
import { View, StyleSheet } from 'react-native';
import PaymentItem from './PaymentItem';
import { useTheme } from '@react-navigation/native';
import { Divider } from '@rneui/themed';

export default function PaymentList() {
  const { colors } = useTheme();

  return (
    <View style={styles(colors).mainView}>
      <PaymentItem date={new Date('2001-01-01')} amount={100} />
      <Divider color={colors.border} style={styles(colors).divider} />
      <PaymentItem date={new Date('2002-02-02')} amount={200} />
      <Divider color={colors.border} style={styles(colors).divider} />
      <PaymentItem date={new Date('2003-03-03')} amount={300} />
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    divider: {
      marginHorizontal: 13,
    },
  });
