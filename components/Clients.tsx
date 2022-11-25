import { useTheme } from '@react-navigation/native';
import { View, Platform, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { Colors } from '../types/Colors';
import { SetStateAction, useState } from 'react';

export default function Clients() {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');

  function updateSearch(value: SetStateAction<string>) {
    setSearch(value);
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder='Search...'
        platform={Platform.OS === 'ios' || Platform.OS === 'android' ? Platform.OS : 'default'}
        lightTheme={false}
        containerStyle={styles(colors).searchBarContainerStyle}
        inputContainerStyle={styles(colors).searchBarInputContainerStyle}
        inputStyle={styles(colors).searchBarInputStyle}
        value={search}
        onChangeText={updateSearch}
      />
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    searchBarContainerStyle: {
      backgroundColor: colors.background,
    },
    searchBarInputContainerStyle: {
      backgroundColor: colors.card,
    },
    searchBarInputStyle: {
      color: colors.text,
    },
  });
