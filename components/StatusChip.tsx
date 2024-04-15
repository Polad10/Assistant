import { Chip } from '@rneui/themed'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

type Props = {
  selected: boolean
  pressable: boolean
  title: string
  color: string
  onPress: () => void
}

export default function StatusChip(props: Props) {
  const themeContext = useContext(ThemeContext)!

  return (
    <Chip
      title={props.title}
      type={props.selected ? 'solid' : 'outline'}
      color={props.color}
      style={{ opacity: props.pressable ? 1 : 0.5 }}
      buttonStyle={{ borderColor: props.color, paddingHorizontal: 15, paddingVertical: 10 }}
      titleStyle={{ color: props.selected ? themeContext.neutral : props.color }}
      onPress={props.onPress}
    />
  )
}
