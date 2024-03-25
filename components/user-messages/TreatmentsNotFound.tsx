import { useContext } from 'react'
import NotFoundIllustration from '../illustrations/NotFoundIllustration'
import UserMessageView from './UserMessageView'
import { LocalizationContext } from '../../contexts/LocalizationContext'

export default function TreatmentsNotFound() {
  const localizationContext = useContext(LocalizationContext)!
  const translator = localizationContext.translator

  return (
    <UserMessageView
      illustration={<NotFoundIllustration />}
      title={translator.translate('treatmentNotFound')}
      subtitle={translator.translate('patientNotFoundMessage')}
    />
  )
}
