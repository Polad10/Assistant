import { useTheme } from '@react-navigation/native'
import { ButtonGroup, ButtonGroupProps } from '@rneui/themed'
import { Colors } from '../types/Colors'
import { StyleSheet } from 'react-native'

export default function MyButtonGroup(props: ButtonGroupProps) {
  const { colors } = useTheme()

  return (
    <ButtonGroup
      {...props}
      buttonStyle={{ backgroundColor: colors.background }}
      containerStyle={styles(colors).container}
      innerBorderStyle={{ color: colors.border }}
      selectedButtonStyle={{ backgroundColor: colors.primary }}
    />
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      borderColor: colors.border,
      borderRadius: 20,
      marginTop: 10,
      marginBottom: 5,
      marginLeft: 0,
      marginRight: 0,
      height: 45,
    },
  })
