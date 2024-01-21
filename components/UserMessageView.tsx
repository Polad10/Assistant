import { useTheme } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../types/Colors'
import { ReactNode } from 'react'
import { Button } from '@rneui/themed'

type Props = {
  illustration: ReactNode
  title: string
  subtitle: string
  btnTitle?: string
  onBtnPress?: () => void
  iconName?: string
}

export default function UserMessageView(props: Props) {
  const { colors } = useTheme()

  return (
    <View style={styles(colors).mainView}>
      <View style={styles(colors).content}>
        {props.illustration}
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>{props.title}</Text>
        <Text style={{ color: colors.text, fontSize: 16, marginTop: 10, opacity: 0.7 }}>{props.subtitle}</Text>
        {props.btnTitle && (
          <Button
            title={props.btnTitle}
            icon={props.iconName ? { name: props.iconName, color: colors.text } : undefined}
            titleStyle={{ fontWeight: 'bold' }}
            buttonStyle={{ borderRadius: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}
            containerStyle={{ marginTop: 50 }}
            color={colors.primary}
            onPress={props.onBtnPress}
          />
        )}
      </View>
    </View>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    mainView: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1000,
      backgroundColor: colors.background,
    },
    content: {
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
