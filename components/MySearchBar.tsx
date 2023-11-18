import { PropsWithChildren, SetStateAction, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { DeviceEventEmitter, Platform, StyleSheet, TextInput } from 'react-native'
import { SearchBar } from '@rneui/themed'
import { SearchBar as BaseSearchBar } from '@rneui/base'
import { Colors } from '../types/Colors'

type Props = {
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
      clear() {
        if (searchBarRef.current) {
          searchBarRef.current.clear()
        }
      },
    }
  })

  function updateSearch(value: SetStateAction<string>) {
    setSearch(value)

    DeviceEventEmitter.emit(props.searchEventName, value)
  }

  return (
    <SearchBar
      ref={searchBarRef}
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
