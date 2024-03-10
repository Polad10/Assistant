import { translate } from '../../helpers/Translator'
import UserMessageView from './UserMessageView'
import PaymentsIllustration from '../illustrations/PaymentsIllustration'

type Props = {
  addBtnOnPress: () => void
}

export default function NoPayments(props: Props) {
  return (
    <UserMessageView
      illustration={<PaymentsIllustration />}
      title={translate('noPayments')}
      subtitle={translate('noPaymentsMessage')}
      btnTitle={translate('addPayment')}
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
