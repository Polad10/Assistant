import { useCallback } from 'react'
import { AgendaList, AgendaListProps } from 'react-native-calendars'
import AgendaItem from './AgendaItem'
import MainView from './MainView'
import { useTheme } from '@react-navigation/native'
import { RootStackParamList } from '../types/Navigation'
import { StyleSheet } from 'react-native'
import { Colors } from '../types/Colors'

interface Props extends AgendaListProps {
  pageName: keyof RootStackParamList
}

export default function MyAgendaList(props: Props) {
  const { colors } = useTheme()

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem appointment={item} />
  }, [])

  function getContentView() {
    return <AgendaList sections={props.sections} renderItem={renderItem} sectionStyle={styles(colors).agendaSection} />
  }

  return <MainView>{getContentView()}</MainView>
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    agendaSection: {
      backgroundColor: colors.card,
      color: colors.text,
    },
  })
