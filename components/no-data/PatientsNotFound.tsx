import { translate } from '../../helpers/Translator'
import NotFoundIllustration from '../illustrations/NotFoundIllustration'
import UserMessageView from '../UserMessageView'

export default function PatientsNotFound() {
  return (
    <UserMessageView
      illustration={<NotFoundIllustration />}
      title={translate('patientNotFound')}
      subtitle={translate('patientNotFoundMessage')}
    />
  )
}
