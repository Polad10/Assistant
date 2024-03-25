import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../../types/Navigation'
import UserMessageView from './UserMessageView'
import PatientsIllustration from '../illustrations/PatientsIllustration'
import { useContext } from 'react'
import { LocalizationContext } from '../../contexts/LocalizationContext'

type Props = {
  pageName: keyof RootStackParamList
}

export default function NoPatients(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  return (
    <UserMessageView
      illustration={<PatientsIllustration />}
      title={translator.translate('noPatients')}
      subtitle={translator.translate('noPatientsMessage')}
      btnTitle={translator.translate('addPatient')}
      onBtnPress={() => navigation.navigate('NewPatient')}
      iconName='add'
    />
  )
}
