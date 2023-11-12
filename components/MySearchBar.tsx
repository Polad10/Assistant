import { SetStateAction, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { DeviceEventEmitter, Platform, StyleSheet } from 'react-native'
import { SearchBar } from '@rneui/themed'
import { Colors } from '../types/Colors'

export default function MySearchBar() {
  const { colors } = useTheme()
  const [search, setSearch] = useState('')

  function updateSearch(value: SetStateAction<string>) {
    setSearch(value)

    DeviceEventEmitter.emit('search', value)
  }

  return (
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
  )
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
  })
