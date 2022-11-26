import { useTheme } from '@react-navigation/native';
import { View, Platform, StyleSheet } from 'react-native';
import { SearchBar, FAB } from '@rneui/themed';
import { Colors } from '../types/Colors';
import { SetStateAction, useState } from 'react';
import ClientGroup from './ClientGroup';

export default function Clients() {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');

  function updateSearch(value: SetStateAction<string>) {
    setSearch(value);
  }

  function addClient() {
    return;
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder='Search...'
        platform={Platform.OS === 'ios' || Platform.OS === 'android' ? Platform.OS : 'default'}
        lightTheme={false}
        containerStyle={styles(colors).searchBarContainer}
        inputContainerStyle={styles(colors).searchBarInputContainer}
        inputStyle={styles(colors).searchBarInput}
        value={search}
        onChangeText={updateSearch}
      />
      <ClientGroup />
      <FAB
        icon={{ name: 'add' }}
        placement='right'
        color={colors.primary}
        style={styles(colors).fab}
        onPress={addClient}
      />
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    searchBarContainer: {
      backgroundColor: colors.background,
    },
    searchBarInputContainer: {
      backgroundColor: colors.card,
    },
    searchBarInput: {
      color: colors.text,
    },
    fab: {
      marginRight: 20,
      marginBottom: 30,
    },
  });
