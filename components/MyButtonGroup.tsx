import { ButtonGroup, ButtonGroupProps } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'

export default function MyButtonGroup(props: ButtonGroupProps) {
  const themeContext = useContext(ThemeContext)!

  return (
    <ButtonGroup
      {...props}
      buttonStyle={{ backgroundColor: themeContext.primary }}
      containerStyle={styles(themeContext).container}
      innerBorderStyle={{ color: themeContext.border }}
      selectedButtonStyle={{ backgroundColor: themeContext.accent }}
    />
  )
}

const styles = (themeContext: ThemeContextType) =>
  StyleSheet.create({
    container: {
      borderColor: themeContext.border,
      borderRadius: 20,
      marginTop: 10,
      marginBottom: 5,
      marginLeft: 0,
      marginRight: 0,
      height: 45,
    },
  })
