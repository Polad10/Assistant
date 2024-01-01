import { View, StyleSheet, ScrollView } from 'react-native'
import TreatmentItem from './TreatmentItem'
import { Divider } from '@rneui/themed'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import { RootStackParamList } from '../types/Navigation'
import MainView from './MainView'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Treatment } from '../modals/Treatment'

type Props = {
  pageName: keyof RootStackParamList
  treatments?: Treatment[]
}

export default function TreatmentList(props: Props) {
  const { colors } = useTheme()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  let treatments = props.treatments

  const treatmentElements = treatments
    ? treatments?.map((t) => {
        return (
          <View key={t.id}>
            <TreatmentItem treatment={t} pageName={props.pageName} />
            <Divider color={colors.border} style={styles(colors).divider} />
          </View>
        )
      })
    : []

  function getTreatmentsContentView() {
    return (
      <ScrollView keyboardDismissMode='on-drag'>
        <MainView>{treatmentElements}</MainView>
      </ScrollView>
    )
  }

  return <MainView>{getTreatmentsContentView()}</MainView>
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    divider: {
      marginHorizontal: 13,
    },
  })
