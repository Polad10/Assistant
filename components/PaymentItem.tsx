import { ListItem } from '@rneui/themed'
import { Alert, DeviceEventEmitter, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { Payment } from '../models/Payment'
import { DateTime } from 'luxon'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { FontAwesome6 } from '@expo/vector-icons'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { Swipeable } from 'react-native-gesture-handler'
import ItemActionDelete from './ItemActions/ItemActionDelete'
import { ToastContext } from '../contexts/ToastContext'

type Props = {
  payment: Payment
  pageName: keyof RootStackParamList
}

export default function PaymentItem(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!
  const dataContext = useContext(DataContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const date = DateTime.fromISO(props.payment.date).setLocale(localizationContext.language).toFormat('MMMM d, yyyy')
  const treatment = dataContext.treatments?.find((t) => t.id === props.payment.treatment_id)

  async function deletePayment() {
    try {
      DeviceEventEmitter.emit('loading')

      await dataContext.deletePayment(props.payment.id)

      toast.showDangerMessage(translator.translate('paymentDeleted'))
    } catch (ex) {
      toast.showDangerMessage(translator.translate('somethingWentWrongMessage'))
    } finally {
      DeviceEventEmitter.emit('loadingFinished')
    }
  }

  async function handleDelete() {
    Alert.alert(translator.translate('areYouSure'), translator.translate('paymentDeleteQuestion'), [
      { text: translator.translate('yes'), onPress: deletePayment },
      { text: translator.translate('no') },
    ])
  }

  function rightActions() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <ItemActionDelete onPress={handleDelete} />
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={rightActions}>
      <View style={{ backgroundColor: themeContext.primary }}>
        <TouchableOpacity onPress={() => navigation.navigate('EditPayment', { paymentId: props.payment.id })}>
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
        </TouchableOpacity>
      </View>
    </Swipeable>
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
