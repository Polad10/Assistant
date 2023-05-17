import { Colors } from '../types/Colors';
import { View, StyleSheet, ScrollView } from 'react-native';
import PaymentItem from './PaymentItem';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation';
import MyFAB from './MyFAB';

type Props = {
  pageName: keyof RootStackParamList;
};

export default function PaymentList(props: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>();

  return (
    <View style={styles(colors).mainView}>
      <ScrollView>
        <PaymentItem date={new Date('2001-01-01')} amount={100} />
        <Divider color={colors.border} style={styles(colors).divider} />
        <PaymentItem date={new Date('2002-02-02')} amount={200} />
        <Divider color={colors.border} style={styles(colors).divider} />
        <PaymentItem date={new Date('2003-03-03')} amount={300} />
      </ScrollView>
      <MyFAB onPress={() => navigation.navigate('NewPayment')} />
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
