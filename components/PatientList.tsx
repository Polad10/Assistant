import { FlatList } from 'react-native-gesture-handler'
import MainView from './MainView'
import { Patient } from '../modals/Patient'
import { ListRenderItemInfo, StyleSheet, View } from 'react-native'
import PatientItem from './PatientItem'
import { Divider } from '@rneui/themed'
import { useTheme } from '@react-navigation/native'
import { RootStackParamList } from '../types/Navigation'
import PatientsNotFound from './no-data/PatientsNotFound'

type Props = {
  patients: Patient[]
  pageName: keyof RootStackParamList
}

export default function PatientList(props: Props) {
  const { colors } = useTheme()

  function renderItem(data: ListRenderItemInfo<Patient>) {
    return (
      <View>
        <PatientItem patient={data.item} pageName={props.pageName} />
        <Divider color={colors.border} style={styles.divider} />
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

  return <MainView>{getContent()}</MainView>
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 13,
  },
})
