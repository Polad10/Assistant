import NoDataView from './NoDataView'
import TreatmentsIllustration from '../illustrations/TreatmentsIllustration'

type Props = {
  addBtnOnPress: () => void
}

export default function NoTreatments(props: Props) {
  return (
    <NoDataView
      illustration={<TreatmentsIllustration />}
      title='No Treatments'
      subtitle="Click the '+' button to begin documenting your patients' treatments."
      addBtnTitle='Add Treatment'
      addBtnOnPress={props.addBtnOnPress}
    />
  )
}
