import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../../types/Navigation'
import EmailSentIllustration from '../illustrations/EmailSentIllustration'
import UserMessageView from './UserMessageView'
import { useContext } from 'react'
import { LocalizationContext } from '../../contexts/LocalizationContext'

export default function EmailSent() {
  const route = useRoute<RootStackScreenProps<'EmailSent'>['route']>()
  const navigation = useNavigation<RootStackScreenProps<'EmailSent'>['navigation']>()
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  return (
    <UserMessageView
      illustration={<EmailSentIllustration />}
      title={translator.translate('checkYourEmail')}
      subtitle={`${translator.translate('weSentEmailTo')} ${route.params.email}`}
      btnTitle={translator.translate('backToLogin')}
      onBtnPress={() => navigation.navigate('Login')}
    />
  )
}
