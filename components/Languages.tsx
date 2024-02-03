import MainView from './MainView'
import { Icon, ListItem } from '@rneui/themed'
import { useContext, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { TouchableHighlight } from 'react-native'
import UkFlag from './flags/UkFlag'
import AzFlag from './flags/AzFlag'
import RuFlag from './flags/RuFlag'

export default function Languages() {
  const themeContext = useContext(ThemeContext)!
  const [selectedLanguage, setSelectedLanguage] = useState<string>('uk')

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
          <ListItem.Title style={{ color: themeContext.neutral }}>Azerbaijani</ListItem.Title>
        </ListItem.Content>
        {selectedLanguage == 'az' && <CheckedIcon />}
      </ListItem>
      <ListItem
        containerStyle={{ backgroundColor: themeContext.secondary, borderColor: themeContext.border }}
        bottomDivider
        onPress={() => setSelectedLanguage('uk')}
        Component={TouchableHighlight}
      >
        <UkFlag />
        <ListItem.Content>
          <ListItem.Title style={{ color: themeContext.neutral }}>English</ListItem.Title>
        </ListItem.Content>
        {selectedLanguage == 'uk' && <CheckedIcon />}
      </ListItem>
      <ListItem
        containerStyle={{ backgroundColor: themeContext.secondary, borderColor: themeContext.border }}
        bottomDivider
        onPress={() => setSelectedLanguage('ru')}
        Component={TouchableHighlight}
      >
        <RuFlag />
        <ListItem.Content>
          <ListItem.Title style={{ color: themeContext.neutral }}>Russian</ListItem.Title>
        </ListItem.Content>
        {selectedLanguage == 'ru' && <CheckedIcon />}
      </ListItem>
    </MainView>
  )
}
