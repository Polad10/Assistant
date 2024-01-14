import { PropsWithChildren, SetStateAction, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { DeviceEventEmitter, StyleSheet, TextInput } from 'react-native'
import { SearchBar } from '@rneui/themed'
import { SearchBar as BaseSearchBar } from '@rneui/base'
import { Colors } from '../types/Colors'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
  placeholder: string
  searchEventName: string
}

type SearchBarRefType = {
  clear: () => void
}

const MySearchBar = forwardRef((props: Props, ref) => {
  const { colors } = useTheme()
  const [search, setSearch] = useState('')

  const searchBarRef = useRef<TextInput & PropsWithChildren<BaseSearchBar>>(null)

  useImperativeHandle(ref, () => {
    return {
      clear,
    }
  })

  function clear() {
    if (searchBarRef.current) {
      searchBarRef.current.clear()
    }
  }

  function updateSearch(value: SetStateAction<string>) {
    setSearch(value)

    DeviceEventEmitter.emit(props.searchEventName, value)
  }

  return (
    <SearchBar
      ref={searchBarRef}
      placeholder={props.placeholder}
      platform={'ios'}
      containerStyle={styles(colors).searchBarContainer}
      inputContainerStyle={styles(colors).searchBarInputContainer}
      inputStyle={styles(colors).searchBarInput}
      searchIcon={<Ionicons name='search-outline' size={20} color={colors.text} />}
      clearIcon={<MaterialIcons name='clear' size={20} color={colors.text} onPress={clear} />}
      value={search}
      onChangeText={updateSearch}
    />
  )
})

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

export default MySearchBar
export { SearchBarRefType }
