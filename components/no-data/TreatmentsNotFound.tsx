import NotFoundIllustration from '../illustrations/NotFoundIllustration'
import UserMessageView from '../UserMessageView'

export default function TreatmentsNotFound() {
  return (
    <UserMessageView
      illustration={<NotFoundIllustration />}
      title='Treatment Not Found'
      subtitle='Please double-check the spelling or try another search term.'
    />
  )
}
