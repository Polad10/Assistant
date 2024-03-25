import UserMessageView from './UserMessageView'
import ErrorIllustration from '../illustrations/ErrorIllustration'
import { useContext } from 'react'
import { LocalizationContext } from '../../contexts/LocalizationContext'

type Props = {
  onBtnPress: () => void
}

export default function Error(props: Props) {
  const localizationContext = useContext(LocalizationContext)!
  const translator = localizationContext.translator

  return (
    <UserMessageView
      illustration={<ErrorIllustration />}
      title={translator.translate('oops')}
      subtitle={translator.translate('tryAgainMessage')}
      btnTitle={translator.translate('tryAgain')}
      onBtnPress={props.onBtnPress}
    />
  )
}
