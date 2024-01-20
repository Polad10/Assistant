import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../../types/Navigation'
import UserMessageView from '../UserMessageView'
import PatientsIllustration from '../illustrations/PatientsIllustration'

type Props = {
  pageName: keyof RootStackParamList
}

export default function NoPatients(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  return (
    <UserMessageView
      illustration={<PatientsIllustration />}
      title='No Patients'
      subtitle="Click the '+' button to add new patients and start managing their records."
      btnTitle='Add Patient'
      onBtnPress={() => navigation.navigate('NewPatient')}
      iconName='add'
    />
  )
}
