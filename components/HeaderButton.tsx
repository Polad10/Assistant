import { useTheme } from '@react-navigation/native'
import { ButtonProps } from 'react-native'
import { Button } from 'react-native'

export default function HeaderButton(props: ButtonProps) {
  const { colors } = useTheme()

  return <Button {...props} color={colors.primary} />
}
