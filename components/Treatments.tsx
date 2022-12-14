import { View, StyleSheet } from 'react-native';
import MyFAB from './MyFAB';
import MySearchBar from './MySearchBar';
import { ListItem, Divider } from '@rneui/themed';
import { Colors } from '../types/Colors';
import { useTheme } from '@react-navigation/native';

export default function Treatments() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <MySearchBar />
      <ListItem containerStyle={styles(colors).listItemContainer}>
        <ListItem.Content>
          <ListItem.Title style={styles(colors).listItemTitle}>Lorem ipsum dolor sit amet consectetur.</ListItem.Title>
          <ListItem.Subtitle style={styles(colors).listItemSubtitle}>Patient: Polad Mammadov</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Divider color={colors.border} style={styles(colors).divider} />
      <MyFAB onPress={() => alert('New Treatment!')} />
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: colors.background,
    },
    listItemTitle: {
      color: colors.text,
      marginBottom: 15,
    },
    listItemSubtitle: {
      color: colors.text,
      opacity: 0.5,
    },
    divider: {
      marginHorizontal: 13,
    },
  });
