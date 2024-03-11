import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../../types/Navigation'
import EmailSentIllustration from '../illustrations/EmailSentIllustration'
import UserMessageView from './UserMessageView'
import { translate } from '../../helpers/Translator'

export default function EmailSent() {
  const route = useRoute<RootStackScreenProps<'EmailSent'>['route']>()
  const navigation = useNavigation<RootStackScreenProps<'EmailSent'>['navigation']>()

  return (
    <UserMessageView
      illustration={<EmailSentIllustration />}
      title={translate('checkYourEmail')}
      subtitle={`${translate('weSentEmailTo')} ${route.params.email}`}
      btnTitle={translate('backToLogin')}
      onBtnPress={() => navigation.navigate('Login')}
    />
  )
}
