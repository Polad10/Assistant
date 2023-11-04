import { useTheme } from '@react-navigation/native'
import { Text, StyleSheet } from 'react-native'
import { Colors } from '../types/Colors'
import MainView from './MainView'

type Props = {
  text: string
}

export default function NoDataFound(props: Props) {
  const { colors } = useTheme()

  return (
    <MainView style={styles(colors).emptyDateView}>
      <Text style={[styles(colors).defaultText, styles(colors).emptyDateText]}>{props.text}</Text>
    </MainView>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    emptyDateView: {
      alignItems: 'center',
      marginTop: 100,
    },
    defaultText: {
      color: colors.text,
    },
    emptyDateText: {
      fontSize: 28,
    },
  })
