import UserMessageView from '../UserMessageView'
import TreatmentsIllustration from '../illustrations/TreatmentsIllustration'

type Props = {
  addBtnOnPress: () => void
}

export default function NoTreatments(props: Props) {
  return (
    <UserMessageView
      illustration={<TreatmentsIllustration />}
      title='No Treatments'
      subtitle="Click the '+' button to begin documenting your patients' treatments."
      btnTitle='Add Treatment'
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
