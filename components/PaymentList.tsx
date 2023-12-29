import { Colors } from '../types/Colors'
import { View, StyleSheet, ScrollView } from 'react-native'
import PaymentItem from './PaymentItem'
import { useTheme } from '@react-navigation/native'
import { Divider } from '@rneui/themed'
import { RootStackParamList } from '../types/Navigation'
import { Payment } from '../modals/Payment'
import MainView from './MainView'
import NoDataFound from './NoDataView'

type Props = {
  pageName: keyof RootStackParamList
  payments: Payment[]
}

export default function PaymentList(props: Props) {
  const { colors } = useTheme()

  const paymentElements = props.payments.map((p) => {
    return (
      <View key={p.id}>
        <PaymentItem payment={p} pageName={props.pageName} />
        <Divider color={colors.border} style={styles(colors).divider} />
      </View>
    )
  })

  function getPaymentsContentView() {
    if (paymentElements.length > 0) {
      return (
        <ScrollView keyboardDismissMode='on-drag'>
          <MainView>{paymentElements}</MainView>
        </ScrollView>
      )
    } else {
      return <NoDataFound text='No payments found' />
    }
  }

  return <MainView>{getPaymentsContentView()}</MainView>
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    divider: {
      marginHorizontal: 13,
    },
  })
