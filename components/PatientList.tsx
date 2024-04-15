import { FlatList } from 'react-native-gesture-handler'
import MainView from './MainView'
import { Patient } from '../models/Patient'
import { DeviceEventEmitter, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import PatientItem from './PatientItem'
import { Divider } from '@rneui/themed'
import { RootStackParamList } from '../types/Navigation'
import PatientsNotFound from './user-messages/PatientsNotFound'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import LoadingView from './LoadingView'

type Props = {
  patients: Patient[]
  pageName: keyof RootStackParamList
}

export default function PatientList(props: Props) {
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

  function renderItem(data: ListRenderItemInfo<Patient>) {
    return (
      <View>
        <PatientItem patient={data.item} pageName={props.pageName} />
        <Divider color={themeContext.border} style={styles.divider} />
      </View>
    )
  }

  function getContent() {
    if (props.patients.length > 0) {
      return (
        <FlatList
          keyboardDismissMode='on-drag'
          data={props.patients}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )
    } else {
      return <PatientsNotFound />
    }
  }

  return (
    <MainView>
      {getContent()}
      {loading && <LoadingView />}
    </MainView>
  )
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 10,
  },
})
