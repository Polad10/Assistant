import UserMessageView from '../UserMessageView'
import PaymentsIllustration from '../illustrations/PaymentsIllustration'

type Props = {
  addBtnOnPress: () => void
}

export default function NoPayments(props: Props) {
  return (
    <UserMessageView
      illustration={<PaymentsIllustration />}
      title='No Payments'
      subtitle="Click the '+' button to start adding payment details for your dental treatments."
      btnTitle='Add Payment'
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
