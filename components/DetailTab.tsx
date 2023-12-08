import { useTheme } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import { StyleSheet } from 'react-native'

type Props = {
  name: string
  type: string
  index: number
  selectedIndex: number
}

export default function DetailTab(props: Props) {
  const { colors } = useTheme()

  return (
    <Icon
      name={props.name}
      size={25}
      type={props.type}
      color={colors.text}
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
