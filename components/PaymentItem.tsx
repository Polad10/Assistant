import { ListItem } from '@rneui/themed'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { Payment } from '../modals/Payment'
import { DateTime } from 'luxon'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { FontAwesome6 } from '@expo/vector-icons'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { language } from '../helpers/Translator'

type Props = {
  payment: Payment
  pageName: keyof RootStackParamList
}

export default function PaymentItem(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const themeContext = useContext(ThemeContext)!

  const context = useContext(DataContext)!

  const date = DateTime.fromISO(props.payment.date).setLocale(language).toFormat('MMMM d, yyyy')
  const treatment = context.treatments?.find((t) => t.id === props.payment.treatment_id)

  return (
    <TouchableHighlight onPress={() => navigation.navigate('EditPayment', { paymentId: props.payment.id })}>
      <ListItem containerStyle={styles(themeContext).listItemContainer}>
        <ListItem.Content style={[styles(themeContext).flexRow, styles(themeContext).spacedItems]}>
          <View>
            <ListItem.Title style={styles(themeContext).defaultText}>{treatment?.title}</ListItem.Title>
            <ListItem.Subtitle style={styles(themeContext).subTitle}>{date}</ListItem.Subtitle>
          </View>
          <View style={styles(themeContext).flexRow}>
            <ListItem.Title style={styles(themeContext).payment}>+ {props.payment.amount}</ListItem.Title>
            <FontAwesome6 name='manat-sign' color='lightgreen' size={16} />
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableHighlight>
  )
}

const styles = (themeContext: ThemeContextType) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: themeContext.primary,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spacedItems: {
      justifyContent: 'space-between',
    },
    defaultText: {
      color: themeContext.neutral,
    },
    subTitle: {
      color: themeContext.neutral,
      opacity: 0.5,
      marginTop: 10,
    },
    payment: {
      color: 'lightgreen',
      marginRight: 10,
    },
    currency: {
      marginLeft: 10,
      color: 'lightgreen',
    },
  })
