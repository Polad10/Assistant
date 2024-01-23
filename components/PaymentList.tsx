import { View, StyleSheet, ListRenderItemInfo } from 'react-native'
import PaymentItem from './PaymentItem'
import { Divider } from '@rneui/themed'
import { RootStackParamList } from '../types/Navigation'
import { Payment } from '../modals/Payment'
import MainView from './MainView'
import { FlatList } from 'react-native-gesture-handler'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

type Props = {
  pageName: keyof RootStackParamList
  payments: Payment[]
}

export default function PaymentList(props: Props) {
  const themeContext = useContext(ThemeContext)!

  function renderItem(data: ListRenderItemInfo<Payment>) {
    return (
      <View>
        <PaymentItem payment={data.item} pageName={props.pageName} />
        <Divider color={themeContext.border} style={styles.divider} />
      </View>
    )
  }

  function getPaymentsContentView() {
    return (
      <FlatList
        keyboardDismissMode='on-drag'
        data={props.payments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    )
  }

  return <MainView>{getPaymentsContentView()}</MainView>
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 10,
  },
})
