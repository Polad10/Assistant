import { View, StyleSheet, ListRenderItemInfo } from 'react-native'
import TreatmentItem from './TreatmentItem'
import { Divider } from '@rneui/themed'
import { useTheme } from '@react-navigation/native'
import { RootStackParamList } from '../types/Navigation'
import MainView from './MainView'
import { Treatment } from '../modals/Treatment'
import TreatmentsNotFound from './no-data/TreatmentsNotFound'
import { FlatList } from 'react-native-gesture-handler'

type Props = {
  pageName: keyof RootStackParamList
  treatments?: Treatment[]
}

export default function TreatmentList(props: Props) {
  const { colors } = useTheme()

  let treatments = props.treatments

  function renderItem(data: ListRenderItemInfo<Treatment>) {
    return (
      <View>
        <TreatmentItem treatment={data.item} pageName={props.pageName} />
        <Divider color={colors.border} style={styles.divider} />
      </View>
    )
  }

  function getTreatmentsContentView() {
    if (treatments && treatments.length > 0) {
      return (
        <FlatList
          keyboardDismissMode='on-drag'
          data={treatments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )
    } else {
      return <TreatmentsNotFound />
    }
  }

  return <MainView>{getTreatmentsContentView()}</MainView>
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 13,
  },
})
