import { useTheme } from '@react-navigation/native';
import { View, Platform, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { Colors } from '../types/Colors';
import { SetStateAction, useState } from 'react';
import PatientGroup from './PatientGroup';
import MyFAB from './MyFAB';

export default function Clients({ navigation }: any) {
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
        containerStyle={styles(colors).searchBarContainer}
        inputContainerStyle={styles(colors).searchBarInputContainer}
        inputStyle={styles(colors).searchBarInput}
        value={search}
        onChangeText={updateSearch}
      />
      <PatientGroup />
      <MyFAB onPress={() => navigation.navigate('NewPatient')} />
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
  });
