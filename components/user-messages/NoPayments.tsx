import UserMessageView from './UserMessageView'
import PaymentsIllustration from '../illustrations/PaymentsIllustration'
import { useContext } from 'react'
import { LocalizationContext } from '../../contexts/LocalizationContext'

type Props = {
  addBtnOnPress: () => void
}

export default function NoPayments(props: Props) {
  const localizationContext = useContext(LocalizationContext)!
  const translator = localizationContext.translator

  return (
    <UserMessageView
      illustration={<PaymentsIllustration />}
      title={translator.translate('noPayments')}
      subtitle={translator.translate('noPaymentsMessage')}
      btnTitle={translator.translate('addPayment')}
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
