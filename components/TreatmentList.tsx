import { View, StyleSheet, ScrollView } from 'react-native'
import TreatmentItem from './TreatmentItem'
import { Status } from '../enums/Status'
import { Divider } from '@rneui/themed'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Colors } from '../types/Colors'
import MyFAB from './MyFAB'
import { RootStackScreenProps, RootStackParamList } from '../types/Navigation'

type Props = {
  pageName: keyof RootStackParamList
  preventDefault?: boolean
}

export default function TreatmentList(props: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  return (
    <View style={styles(colors).mainView}>
      <ScrollView>
        <TreatmentItem
          description='Lorem ipsum dolor sit amet consectetur.'
          patientName='Polad Mammadov'
          startDate={new Date()}
          status={Status.ONGOING}
          pageName={props.pageName}
          preventDefault={props.preventDefault}
        />
        <Divider color={colors.border} style={styles(colors).divider} />
        <TreatmentItem
          description='Lorem ipsum dolor sit amet consectetur.'
          patientName='Polad Mammadov'
          startDate={new Date()}
          status={Status.FINISHED}
          pageName={props.pageName}
          preventDefault={props.preventDefault}
        />
        <Divider color={colors.border} style={styles(colors).divider} />
        <TreatmentItem
          description='Lorem ipsum dolor sit amet consectetur.'
          patientName='Polad Mammadov'
          startDate={new Date()}
          status={Status.FINISHED}
          pageName={props.pageName}
          preventDefault={props.preventDefault}
        />
        <Divider color={colors.border} style={styles(colors).divider} />
      </ScrollView>
      <MyFAB onPress={() => navigation.navigate('NewTreatment')} />
    </View>
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
