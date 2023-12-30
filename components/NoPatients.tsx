import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import NoDataFound from './NoDataView'
import PatientsIllustration from './illustrations/PatientsIllustration'

type Props = {
  pageName: keyof RootStackParamList
}

export default function NoPatients(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  return (
    <NoDataFound
      illustration={<PatientsIllustration />}
      title='No Patients'
      subtitle="Click the '+' button to add new patients and start managing their records."
      addBtnTitle='Add Patient'
      addBtnOnPress={() => navigation.navigate('NewPatient')}
    />
  )
}
