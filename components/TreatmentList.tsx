import { View, StyleSheet, ScrollView } from 'react-native'
import TreatmentItem from './TreatmentItem'
import { Divider } from '@rneui/themed'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import MyFAB from './MyFAB'
import { RootStackScreenProps, RootStackParamList } from '../types/Navigation'
import MainView from './MainView'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Patient } from '../modals/Patient'
import { Treatment } from '../modals/Treatment'
import NoDataFound from './NoDataView'
import { getPatientTreatments } from '../helpers/TreatmentHelper'

type Props = {
  pageName: keyof RootStackParamList
  patient?: Patient
  treatments?: Treatment[]
}

export default function TreatmentList(props: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  let treatments = props.treatments

  if (props.patient) {
    treatments = getPatientTreatments(context.treatments ?? [], props.patient.id)
  }

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
    if (treatmentElements.length > 0) {
      return (
        <ScrollView keyboardDismissMode='on-drag'>
          <MainView>{treatmentElements}</MainView>
        </ScrollView>
      )
    } else {
      return <NoDataFound text='No treatments found' />
    }
  }

  return (
    <MainView>
      {getTreatmentsContentView()}
      <MyFAB onPress={() => navigation.navigate('NewTreatment', { patient: props.patient })} />
    </MainView>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    divider: {
      marginHorizontal: 13,
    },
  })
