import { useCallback, useContext } from 'react'
import { AgendaList, AgendaListProps } from 'react-native-calendars'
import AgendaItem from './AgendaItem'
import MainView from './MainView'
import { RootStackParamList } from '../types/Navigation'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../types/Colors'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { Divider } from '@rneui/themed'

interface Props extends AgendaListProps {
  pageName: keyof RootStackParamList
}

export default function MyAgendaList(props: Props) {
  const themeContext = useContext(ThemeContext)!

  const renderItem = useCallback(({ item }: any) => {
    return (
      <View>
        <AgendaItem appointment={item} />
        <Divider color={themeContext.border} />
      </View>
    )
  }, [])

  function getContentView() {
    return (
      <AgendaList sections={props.sections} renderItem={renderItem} sectionStyle={styles(themeContext).agendaSection} />
    )
  }

  return <MainView>{getContentView()}</MainView>
}

const styles = (themeContext: ThemeContextType) =>
  StyleSheet.create({
    agendaSection: {
      backgroundColor: themeContext.secondary,
      color: themeContext.neutral,
    },
    divider: {
      marginHorizontal: 10,
    },
  })
