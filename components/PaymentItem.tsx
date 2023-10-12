import { ListItem } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import { Colors } from '../types/Colors'
import { useTheme } from '@react-navigation/native'

type Props = {
  date: string
  amount: number
}

export default function PaymentItem(props: Props) {
  const { colors } = useTheme()

  return (
    <ListItem containerStyle={styles(colors).listItemContainer}>
      <ListItem.Content style={styles(colors).listItemRow}>
        <ListItem.Title style={styles(colors).listItemTitle}>{props.date}</ListItem.Title>
        <ListItem.Title style={styles(colors).listItemTitle}>+ {props.amount}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: colors.background,
    },
    listItemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listItemTitle: {
      color: colors.text,
    },
  })
