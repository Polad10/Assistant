import { useTheme } from '@react-navigation/native'
import { Icon } from '@rneui/themed'

type Props = {
  iconName: string
  index: number
  selectedIndex: number
}

export default function DetailTab(props: Props) {
  const { colors } = useTheme()

  return <Icon name={props.iconName} size={22} type='font-awesome-5' color={colors.text} />
}
