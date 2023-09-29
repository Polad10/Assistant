import { View, StyleSheet, ScrollView } from 'react-native'
import TreatmentItem from './TreatmentItem'
import { Divider } from '@rneui/themed'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import MyFAB from './MyFAB'
import { RootStackScreenProps, RootStackParamList } from '../types/Navigation'
import MainView from './MainView'

type Props = {
  pageName: keyof RootStackParamList
  patient?: string
  treatments?: Treatment[]
  preventDefault?: boolean
}

export default function TreatmentList(props: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  let treatmentElements = null

  if (props.treatments) {
    treatmentElements = props.treatments.map((t) => {
      return (
        <View key={t.id}>
          <TreatmentItem treatment={t} pageName={props.pageName} preventDefault={props.preventDefault} />
          <Divider color={colors.border} style={styles(colors).divider} />
        </View>
      )
    })
  }

  return (
    <MainView>
      <ScrollView>
        <MainView>{treatmentElements}</MainView>
      </ScrollView>
      <MyFAB onPress={() => navigation.navigate('NewTreatment', { patient: props.patient })} />
    </MainView>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    divider: {
      marginHorizontal: 13,
    },
  })
