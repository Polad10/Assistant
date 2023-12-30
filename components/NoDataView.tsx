import { useTheme } from '@react-navigation/native'
import { StyleSheet, Text } from 'react-native'
import { Colors } from '../types/Colors'
import MainView from './MainView'
import { ReactNode } from 'react'
import { Button } from '@rneui/themed'

type Props = {
  illustration: ReactNode
  title: string
  subtitle: string
  addBtnTitle: string
  addBtnOnPress: () => void
}

export default function NoDataFound(props: Props) {
  const { colors } = useTheme()

  return (
    <MainView style={styles(colors).emptyDateView}>
      {props.illustration}
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>{props.title}</Text>
      <Text style={{ color: colors.text, fontSize: 16, marginTop: 10, opacity: 0.7 }}>{props.subtitle}</Text>
      <Button
        title={props.addBtnTitle}
        icon={{ name: 'add', color: colors.text }}
        titleStyle={{ fontWeight: 'bold' }}
        buttonStyle={{ borderRadius: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}
        containerStyle={{ marginTop: 50 }}
        color={colors.primary}
        onPress={props.addBtnOnPress}
      />
    </MainView>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    emptyDateView: {
      alignItems: 'center',
      marginTop: 50,
      paddingHorizontal: 30,
    },
    defaultText: {
      color: colors.text,
    },
    emptyDateText: {
      fontSize: 28,
    },
  })
