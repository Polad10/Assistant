import MainView from './MainView'
import { Icon, ListItem } from '@rneui/themed'
import { useContext, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { TouchableHighlight } from 'react-native'
import UkFlag from './flags/UkFlag'
import AzFlag from './flags/AzFlag'
import RuFlag from './flags/RuFlag'
import { GetFullLanguageName } from '../helpers/LanguageHelper'
import { DataContext } from '../contexts/DataContext'
import { LocalizationContext } from '../contexts/LocalizationContext'

export default function Languages() {
  const themeContext = useContext(ThemeContext)!
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!

  const [selectedLanguage, setSelectedLanguage] = useState<string>(localizationContext.language)

  async function updateLanguage(language: string) {
    try {
      setSelectedLanguage(language)

      if (dataContext.setting) {
        const setting = { ...dataContext.setting, language }

        await dataContext.updateSetting(setting)
      } else {
        const setting = { language }

        await dataContext.createSetting(setting)
      }
    } catch (ex) {
      // it is okay if settings were not synced to db
    }
  }

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
        onPress={() => updateLanguage('az')}
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
        onPress={() => updateLanguage('en')}
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
        onPress={() => updateLanguage('ru')}
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
