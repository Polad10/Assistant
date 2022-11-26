import { View, StyleSheet } from 'react-native';
import { ListItem, Divider } from '@rneui/base';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../types/Colors';

export default function ClientGroup() {
  const { colors } = useTheme();

  return (
    <View>
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitleCategory}>P</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Divider color={colors.border} style={styles(colors).divider} />
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitle}>Polad Mammadov</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Divider color={colors.border} style={styles(colors).divider} />
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: colors.background,
    },
    listItemTitleCategory: {
      color: colors.text,
      opacity: 0.5,
    },
    listItemTitle: {
      color: colors.text,
    },
    divider: {
      marginHorizontal: 13,
    },
  });
