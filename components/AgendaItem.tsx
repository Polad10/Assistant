import { memo, useCallback } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../types/Colors'

import type { RootStackScreenProps } from '../types/Navigation'

type ItemProps = {
  item: any
}

const AgendaItem = (props: ItemProps) => {
  const { item } = props
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()

  const itemPressed = useCallback(() => {
    navigation.navigate('EditAppointment', { treatment: item.treatment_id })
  }, [])

  if (!item) {
    return (
      <View style={styles(colors).emptyItem}>
        <Text style={styles(colors).emptyItemText}>No events planned Today</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles(colors).item}>
      <View>
        <Text style={styles(colors).itemHourText}>{item.actions}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    item: {
      padding: 20,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: 'row',
    },
    itemHourText: {
      color: colors.text,
    },
    itemDurationText: {
      color: colors.text,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
    itemTitleText: {
      color: colors.text,
      marginLeft: 16,
      fontWeight: 'bold',
      fontSize: 16,
    },
    itemButtonContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    emptyItem: {
      paddingLeft: 20,
      height: 52,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
    },
    emptyItemText: {
      color: colors.text,
      fontSize: 14,
    },
  })

export default memo(AgendaItem)
