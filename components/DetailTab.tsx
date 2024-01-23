import { Icon } from '@rneui/themed'
import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeContext } from '../contexts/ThemeContext'

type Props = {
  name: string
  type: string
  index: number
  selectedIndex: number
}

export default function DetailTab(props: Props) {
  const themeContext = useContext(ThemeContext)!

  return (
    <Icon
      name={props.name}
      size={25}
      type={props.type}
      color={themeContext.neutral}
      style={styles(props.index, props.selectedIndex).icon}
    />
  )
}

const styles = (index: number, selectedIndex: number) =>
  StyleSheet.create({
    icon: {
      opacity: index == selectedIndex ? 1 : 0.6,
    },
  })
