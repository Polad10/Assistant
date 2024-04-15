import { View, StyleSheet, ListRenderItemInfo, DeviceEventEmitter } from 'react-native'
import PaymentItem from './PaymentItem'
import { Divider } from '@rneui/themed'
import { RootStackParamList } from '../types/Navigation'
import { Payment } from '../models/Payment'
import MainView from './MainView'
import { FlatList } from 'react-native-gesture-handler'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import LoadingView from './LoadingView'

type Props = {
  pageName: keyof RootStackParamList
  payments: Payment[]
}

export default function PaymentList(props: Props) {
  const themeContext = useContext(ThemeContext)!

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadingListener = DeviceEventEmitter.addListener('loading', () => setLoading(true))
    const loadingFinishedListener = DeviceEventEmitter.addListener('loadingFinished', () => setLoading(false))

    return () => {
      loadingListener.remove()
      loadingFinishedListener.remove()
    }
  }, [])

  function renderItem(data: ListRenderItemInfo<Payment>) {
    return (
      <View>
        <PaymentItem payment={data.item} pageName={props.pageName} />
        <Divider color={themeContext.border} style={styles.divider} />
      </View>
    )
  }

  return (
    <MainView>
      <FlatList
        keyboardDismissMode='on-drag'
        data={props.payments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {loading && <LoadingView />}
    </MainView>
  )
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 10,
  },
})
