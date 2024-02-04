import { translate } from '../../helpers/Translator'
import NotFoundIllustration from '../illustrations/NotFoundIllustration'
import UserMessageView from '../UserMessageView'

export default function TreatmentsNotFound() {
  return (
    <UserMessageView
      illustration={<NotFoundIllustration />}
      title={translate('treatmentNotFound')}
      subtitle={translate('patientNotFoundMessage')}
    />
  )
}
