import { useCallback, useContext, useEffect, useState } from 'react'
import { AgendaList, AgendaListProps } from 'react-native-calendars'
import AgendaItem from './AgendaItem'
import MainView from './MainView'
import { RootStackParamList } from '../types/Navigation'
import { DeviceEventEmitter, StyleSheet, View } from 'react-native'
import { Colors } from '../types/Colors'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { Divider } from '@rneui/themed'
import LoadingView from './LoadingView'

interface Props extends AgendaListProps {
  pageName: keyof RootStackParamList
}

export default function MyAgendaList(props: Props) {
  const themeContext = useContext(ThemeContext)!
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadingListener = DeviceEventEmitter.addListener('loading', () => setLoading(true))
    const loadingFinishedListener = DeviceEventEmitter.addListener('loadingFinished', () => setLoading(false))

    return () => {
      loadingListener.remove()
      loadingFinishedListener.remove()
    }
  }, [])

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
      <>
        <AgendaList
          sections={props.sections}
          renderItem={renderItem}
          sectionStyle={styles(themeContext).agendaSection}
        />
        {loading && <LoadingView />}
      </>
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
