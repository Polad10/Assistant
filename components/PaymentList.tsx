import { Colors } from '../types/Colors'
import { View, StyleSheet, ListRenderItemInfo } from 'react-native'
import PaymentItem from './PaymentItem'
import { useTheme } from '@react-navigation/native'
import { Divider } from '@rneui/themed'
import { RootStackParamList } from '../types/Navigation'
import { Payment } from '../modals/Payment'
import MainView from './MainView'
import { FlatList } from 'react-native-gesture-handler'

type Props = {
  pageName: keyof RootStackParamList
  payments: Payment[]
}

export default function PaymentList(props: Props) {
  const { colors } = useTheme()

  function renderItem(data: ListRenderItemInfo<Payment>) {
    return (
      <View>
        <PaymentItem payment={data.item} pageName={props.pageName} />
        <Divider color={colors.border} style={styles(colors).divider} />
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

const styles = (colors: Colors) =>
  StyleSheet.create({
    divider: {
      marginHorizontal: 13,
    },
  })
