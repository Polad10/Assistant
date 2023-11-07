import { ListItem } from '@rneui/themed'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { Colors } from '../types/Colors'
import { useNavigation, useTheme } from '@react-navigation/native'
import CustomIcon from './CustomIcon'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { Payment } from '@polad10/assistant-models/Payment'
import { DateTime } from 'luxon'

type Props = {
  payment: Payment
  pageName: keyof RootStackParamList
}

export default function PaymentItem(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const { colors } = useTheme()

  const date = DateTime.fromISO(props.payment.date).toISODate()

  return (
    <TouchableHighlight onPress={() => navigation.navigate('EditPayment', { paymentId: props.payment.id })}>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content style={[styles(colors).flexRow, styles(colors).spacedItems]}>
          <ListItem.Title style={styles(colors).defaultText}>{date}</ListItem.Title>
          <View style={styles(colors).flexRow}>
            <ListItem.Title style={styles(colors).payment}>+ {props.payment.amount}</ListItem.Title>
            <CustomIcon style={styles(colors).currency} name='manat' size={18} color={colors.text} />
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableHighlight>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: colors.background,
    },
    flexRow: {
      flexDirection: 'row',
    },
    spacedItems: {
      justifyContent: 'space-between',
    },
    defaultText: {
      color: colors.text,
    },
    payment: {
      color: colors.notification,
    },
    currency: {
      marginLeft: 10,
      color: colors.notification,
    },
  })
