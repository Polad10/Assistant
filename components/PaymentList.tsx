import { Colors } from '../types/Colors'
import { View, StyleSheet, ScrollView } from 'react-native'
import PaymentItem from './PaymentItem'
import { useTheme } from '@react-navigation/native'
import { Divider } from '@rneui/themed'
import { RootStackParamList } from '../types/Navigation'
import { DateTime } from 'luxon'
import { Payment } from '@polad10/assistant-models/Payment'
import MainView from './MainView'
import NoDataFound from './NoDataView'

type Props = {
  pageName: keyof RootStackParamList
  payments: Payment[]
}

export default function PaymentList(props: Props) {
  const { colors } = useTheme()

  props.payments.sort((p1, p2) => p2.date.localeCompare(p1.date))

  const paymentElements = props.payments.map((p) => {
    const date = DateTime.fromISO(p.date).toISODate() ?? 'Date not found'

    return (
      <View key={p.id}>
        <PaymentItem date={date} amount={p.amount} />
        <Divider color={colors.border} style={styles(colors).divider} />
      </View>
    )
  })

  function getPaymentsContentView() {
    if (paymentElements.length > 0) {
      return <ScrollView>{paymentElements}</ScrollView>
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
