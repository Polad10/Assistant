import { translate } from '../../helpers/Translator'
import UserMessageView from './UserMessageView'
import TreatmentsIllustration from '../illustrations/TreatmentsIllustration'

type Props = {
  addBtnOnPress: () => void
}

export default function NoTreatments(props: Props) {
  return (
    <UserMessageView
      illustration={<TreatmentsIllustration />}
      title={translate('noTreatments')}
      subtitle={translate('noTreatmentsMessage')}
      btnTitle={translate('addTreatment')}
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
