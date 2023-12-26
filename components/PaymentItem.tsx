import { ListItem } from '@rneui/themed'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { Colors } from '../types/Colors'
import { useNavigation, useTheme } from '@react-navigation/native'
import CustomIcon from './CustomIcon'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { Payment } from '../modals/Payment'
import { DateTime } from 'luxon'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'

type Props = {
  payment: Payment
  pageName: keyof RootStackParamList
}

export default function PaymentItem(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const { colors } = useTheme()

  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const date = DateTime.fromISO(props.payment.date).toFormat('MMMM d, yyyy')
  const treatment = context.treatments?.find((t) => t.id === props.payment.treatment_id)

  return (
    <TouchableHighlight onPress={() => navigation.navigate('EditPayment', { paymentId: props.payment.id })}>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content style={[styles(colors).flexRow, styles(colors).spacedItems]}>
          <View>
            <ListItem.Title style={styles(colors).defaultText}>{treatment?.title}</ListItem.Title>
            <ListItem.Subtitle style={styles(colors).subTitle}>{date}</ListItem.Subtitle>
          </View>
          <View style={styles(colors).flexRow}>
            <ListItem.Title style={styles(colors).payment}>+ {props.payment.amount}</ListItem.Title>
            <CustomIcon style={styles(colors).currency} name='manat' size={16} />
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
      alignItems: 'center',
    },
    spacedItems: {
      justifyContent: 'space-between',
    },
    defaultText: {
      color: colors.text,
    },
    subTitle: {
      color: colors.text,
      opacity: 0.5,
      marginTop: 10,
    },
    payment: {
      color: 'lightgreen',
    },
    currency: {
      marginLeft: 10,
      color: 'lightgreen',
    },
  })
