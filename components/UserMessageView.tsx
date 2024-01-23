import { StyleSheet, Text, View } from 'react-native'
import { ReactNode, useContext } from 'react'
import { Button } from '@rneui/themed'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'

type Props = {
  illustration: ReactNode
  title: string
  subtitle: string
  btnTitle?: string
  onBtnPress?: () => void
  iconName?: string
}

export default function UserMessageView(props: Props) {
  const themeContext = useContext(ThemeContext)!

  return (
    <View style={styles(themeContext).mainView}>
      <View style={styles(themeContext).content}>
        {props.illustration}
        <Text style={{ color: themeContext.neutral, fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>
          {props.title}
        </Text>
        <Text style={{ color: themeContext.neutral, fontSize: 16, marginTop: 10, opacity: 0.7 }}>{props.subtitle}</Text>
        {props.btnTitle && (
          <Button
            title={props.btnTitle}
            icon={props.iconName ? { name: props.iconName, color: themeContext.neutral } : undefined}
            titleStyle={{ fontWeight: 'bold' }}
            buttonStyle={{ borderRadius: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}
            containerStyle={{ marginTop: 50 }}
            color={themeContext.accent}
            onPress={props.onBtnPress}
          />
        )}
      </View>
    </View>
  )
}

const styles = (themeContext: ThemeContextType) =>
  StyleSheet.create({
    mainView: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1000,
      backgroundColor: themeContext.primary,
    },
    content: {
      alignItems: 'center',
      marginTop: 50,
      paddingHorizontal: 30,
    },
    defaultText: {
      color: themeContext.neutral,
    },
    emptyDateText: {
      fontSize: 28,
    },
  })
