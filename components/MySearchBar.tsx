import { PropsWithChildren, SetStateAction, forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react'
import { DeviceEventEmitter, StyleSheet, TextInput } from 'react-native'
import { SearchBar } from '@rneui/themed'
import { SearchBar as BaseSearchBar } from '@rneui/base'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { LocalizationContext } from '../contexts/LocalizationContext'

type Props = {
  placeholder: string
  searchEventName: string
}

type SearchBarRefType = {
  clear: () => void
}

const MySearchBar = forwardRef((props: Props, ref) => {
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!

  const [search, setSearch] = useState('')

  const translator = localizationContext.translator
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
      containerStyle={styles(themeContext).searchBarContainer}
      inputContainerStyle={styles(themeContext).searchBarInputContainer}
      inputStyle={styles(themeContext).searchBarInput}
      searchIcon={<Ionicons name='search-outline' size={20} color={themeContext.neutral} />}
      clearIcon={<MaterialIcons name='clear' size={20} color={themeContext.neutral} onPress={clear} />}
      cancelButtonTitle={translator.translate('cancel')}
      value={search}
      onChangeText={updateSearch}
    />
  )
})

const styles = (themeContext: ThemeContextType) =>
  StyleSheet.create({
    searchBarContainer: {
      backgroundColor: themeContext.primary,
    },
    searchBarInputContainer: {
      backgroundColor: themeContext.primary,
    },
    searchBarInput: {
      color: themeContext.neutral,
    },
  })

export default MySearchBar
export { SearchBarRefType }
