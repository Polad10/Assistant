import { useContext } from 'react'
import MainView from './MainView'
import { Icon, ListItem, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { translate } from '../helpers/Translator'

export default function Settings() {
  const navigation = useNavigation<RootStackScreenProps<'Settings'>['navigation']>()
  const themeContext = useContext(ThemeContext)!

  return (
    <MainView style={{ paddingTop: 20 }}>
      <Text style={{ color: themeContext.neutral, fontSize: 16, opacity: 0.5, marginBottom: 5, marginLeft: 10 }}>
        {translate('general')}
      </Text>
      <ListItem
        containerStyle={{ backgroundColor: themeContext.secondary, borderColor: themeContext.border }}
        bottomDivider
        onPress={() => navigation.navigate('Languages')}
        Component={TouchableHighlight}
      >
        <Icon name='language-outline' type='ionicon' color={themeContext.neutral} />
        <ListItem.Content>
          <ListItem.Title style={{ color: themeContext.neutral }}>{translate('language')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title style={{ color: themeContext.neutral, opacity: 0.5 }}>English</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size={20} />
      </ListItem>
      <ListItem
        containerStyle={{ backgroundColor: themeContext.secondary, borderColor: themeContext.border }}
        bottomDivider
        Component={TouchableHighlight}
      >
        <Icon name='color-palette-outline' type='ionicon' color={themeContext.neutral} />
        <ListItem.Content>
          <ListItem.Title style={{ color: themeContext.neutral }}>{translate('theme')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title style={{ color: themeContext.neutral, opacity: 0.5 }}>Dark</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size={20} />
      </ListItem>
    </MainView>
  )
}
