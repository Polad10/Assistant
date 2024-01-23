import { FAB, FABProps } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export default function MyFAB(props: FABProps) {
  const themeContext = useContext(ThemeContext)!

  return (
    <FAB
      {...props}
      icon={{ name: 'add', color: themeContext.neutral }}
      placement='right'
      color={themeContext.accent}
      style={styles.fab}
    />
  )
}

const styles = StyleSheet.create({
  fab: {
    marginRight: 20,
    marginBottom: 30,
  },
})
