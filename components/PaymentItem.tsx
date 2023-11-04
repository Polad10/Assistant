import { ListItem } from '@rneui/themed'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../types/Colors'
import { useTheme } from '@react-navigation/native'
import CustomIcon from './CustomIcon'

type Props = {
  date: string
  amount: number
}

export default function PaymentItem(props: Props) {
  const { colors } = useTheme()

  return (
    <ListItem containerStyle={styles(colors).listItemContainer}>
      <ListItem.Content style={[styles(colors).flexRow, styles(colors).spacedItems]}>
        <ListItem.Title style={styles(colors).defaultText}>{props.date}</ListItem.Title>
        <View style={styles(colors).flexRow}>
          <ListItem.Title style={styles(colors).payment}>+ {props.amount}</ListItem.Title>
          <CustomIcon style={styles(colors).currency} name='manat' size={18} color={colors.text} />
        </View>
      </ListItem.Content>
    </ListItem>
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
