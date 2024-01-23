import { useContext } from 'react'
import { ButtonProps } from 'react-native'
import { Button } from 'react-native'
import { ThemeContext } from '../contexts/ThemeContext'

export default function HeaderButton(props: ButtonProps) {
  const themeContext = useContext(ThemeContext)!

  return <Button {...props} color={themeContext.accent} />
}
