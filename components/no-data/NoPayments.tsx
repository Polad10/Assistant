import NoDataFound from './NoDataView'
import PaymentsIllustration from '../illustrations/PaymentsIllustration'

type Props = {
  addBtnOnPress: () => void
}

export default function NoPayments(props: Props) {
  return (
    <NoDataFound
      illustration={<PaymentsIllustration />}
      title='No Payments'
      subtitle="Click the '+' button to start adding payment details for your dental treatments."
      addBtnTitle='Add Payment'
      addBtnOnPress={props.addBtnOnPress}
    />
  )
}
