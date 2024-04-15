import Ionicons from '@expo/vector-icons/Ionicons'
import { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../../contexts/ThemeContext'

type Props = {
  backgroundColor: string
  title: string
  iconName: 'arrow-undo-circle-outline' | 'checkmark-circle-outline' | 'remove-circle-outline' | 'trash-outline'
  onPress: () => void
}

export default function ItemAction(props: Props) {
  const themeContext = useContext(ThemeContext)!

  return (
    <TouchableOpacity
      style={{ width: 80, backgroundColor: props.backgroundColor, justifyContent: 'center', alignItems: 'center' }}
      onPress={props.onPress}
    >
      <Ionicons name={props.iconName} size={25} color={themeContext.neutral} />
      <Text style={{ color: themeContext.neutral, marginTop: 5 }}>{props.title}</Text>
    </TouchableOpacity>
  )
}
