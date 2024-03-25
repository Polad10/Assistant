import { useContext } from 'react'
import MainView from './MainView'
import { Icon, ListItem, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { GetFullLanguageName } from '../helpers/LanguageHelper'
import { LocalizationContext } from '../contexts/LocalizationContext'

export default function Settings() {
  const navigation = useNavigation<RootStackScreenProps<'Settings'>['navigation']>()
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator
  const selectedLanguage = GetFullLanguageName(localizationContext.language)

  return (
    <MainView style={{ paddingTop: 20 }}>
      <Text style={{ color: themeContext.neutral, fontSize: 16, opacity: 0.5, marginBottom: 5, marginLeft: 10 }}>
        {translator.translate('general')}
      </Text>
      <ListItem
        containerStyle={{ backgroundColor: themeContext.secondary, borderColor: themeContext.border }}
        bottomDivider
        onPress={() => navigation.navigate('Languages')}
        Component={TouchableHighlight}
      >
        <Icon name='language-outline' type='ionicon' color={themeContext.neutral} />
        <ListItem.Content>
          <ListItem.Title style={{ color: themeContext.neutral }}>{translator.translate('language')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title style={{ color: themeContext.neutral, opacity: 0.5 }}>{selectedLanguage}</ListItem.Title>
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
          <ListItem.Title style={{ color: themeContext.neutral }}>{translator.translate('theme')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title style={{ color: themeContext.neutral, opacity: 0.5 }}>
            {translator.translate('dark')}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size={20} />
      </ListItem>
    </MainView>
  )
}
