import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../../types/Navigation'
import UserMessageView from '../UserMessageView'
import PatientsIllustration from '../illustrations/PatientsIllustration'
import { translate } from '../../helpers/Translator'

type Props = {
  pageName: keyof RootStackParamList
}

export default function NoPatients(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  return (
    <UserMessageView
      illustration={<PatientsIllustration />}
      title={translate('noPatients')}
      subtitle={translate('noPatientsMessage')}
      btnTitle={translate('addPatient')}
      onBtnPress={() => navigation.navigate('NewPatient')}
      iconName='add'
    />
  )
}
