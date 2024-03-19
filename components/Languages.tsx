import MainView from './MainView'
import { Icon, ListItem } from '@rneui/themed'
import { useContext, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { TouchableHighlight } from 'react-native'
import UkFlag from './flags/UkFlag'
import AzFlag from './flags/AzFlag'
import RuFlag from './flags/RuFlag'
import { GetFullLanguageName } from '../helpers/LanguageHelper'

export default function Languages() {
  const themeContext = useContext(ThemeContext)!
  const [selectedLanguage, setSelectedLanguage] = useState<string>('az')

  const CheckedIcon = () => {
    return (
      <ListItem.Content right>
        <Icon name='checkmark-circle-outline' type='ionicon' color={themeContext.success} size={25} />
      </ListItem.Content>
    )
  }

  return (
    <MainView style={{ paddingTop: 20 }}>
      <ListItem
        containerStyle={{ backgroundColor: themeContext.secondary, borderColor: themeContext.border }}
        bottomDivider
        onPress={() => setSelectedLanguage('az')}
        Component={TouchableHighlight}
      >
        <AzFlag />
        <ListItem.Content>
          <ListItem.Title style={{ color: themeContext.neutral }}>{GetFullLanguageName('az')}</ListItem.Title>
        </ListItem.Content>
        {selectedLanguage == 'az' && <CheckedIcon />}
      </ListItem>
      <ListItem
        containerStyle={{ backgroundColor: themeContext.secondary, borderColor: themeContext.border }}
        bottomDivider
        onPress={() => setSelectedLanguage('en')}
        Component={TouchableHighlight}
      >
        <UkFlag />
        <ListItem.Content>
          <ListItem.Title style={{ color: themeContext.neutral }}>{GetFullLanguageName('en')}</ListItem.Title>
        </ListItem.Content>
        {selectedLanguage == 'en' && <CheckedIcon />}
      </ListItem>
      <ListItem
        containerStyle={{ backgroundColor: themeContext.secondary, borderColor: themeContext.border }}
        bottomDivider
        onPress={() => setSelectedLanguage('ru')}
        Component={TouchableHighlight}
      >
        <RuFlag />
        <ListItem.Content>
          <ListItem.Title style={{ color: themeContext.neutral }}>{GetFullLanguageName('ru')}</ListItem.Title>
        </ListItem.Content>
        {selectedLanguage == 'ru' && <CheckedIcon />}
      </ListItem>
    </MainView>
  )
}
