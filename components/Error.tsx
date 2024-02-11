import { translate } from '../helpers/Translator'
import UserMessageView from './UserMessageView'
import ErrorIllustration from './illustrations/ErrorIllustration'

type Props = {
  onBtnPress: () => void
}

export default function Error(props: Props) {
  return (
    <UserMessageView
      illustration={<ErrorIllustration />}
      title={translate('oops')}
      subtitle={translate('tryAgainMessage')}
      btnTitle={translate('tryAgain')}
      onBtnPress={props.onBtnPress}
    />
  )
}
