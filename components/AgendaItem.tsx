import { memo, useCallback } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../types/Colors';

type ItemProps = {
  item: any;
};

const AgendaItem = (props: ItemProps) => {
  const { item } = props;
  const { colors } = useTheme();

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, []);

  if (!item) {
    return (
      <View style={styles(colors).emptyItem}>
        <Text style={styles(colors).emptyItemText}>No events planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles(colors).item}>
      <View>
        <Text style={styles(colors).itemHourText}>{item.hour}</Text>
        <Text style={styles(colors).itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles(colors).itemTitleText}>{item.title}</Text>
    </TouchableOpacity>
  );
};

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
  });

export default memo(AgendaItem);
