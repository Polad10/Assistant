import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../../types/Navigation'
import EmailSentIllustration from '../illustrations/EmailSentIllustration'
import UserMessageView from './UserMessageView'

export default function EmailSent() {
  const route = useRoute<RootStackScreenProps<'EmailSent'>['route']>()
  const navigation = useNavigation<RootStackScreenProps<'EmailSent'>['navigation']>()

  return (
    <UserMessageView
      illustration={<EmailSentIllustration />}
      title='Check your email'
      subtitle={`We sent an email to ${route.params.email}`}
      btnTitle='Back to login'
      onBtnPress={() => navigation.navigate('Login')}
    />
  )
}
