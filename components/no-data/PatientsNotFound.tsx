import NotFoundIllustration from '../illustrations/NotFoundIllustration'
import UserMessageView from '../UserMessageView'

export default function PatientsNotFound() {
  return (
    <UserMessageView
      illustration={<NotFoundIllustration />}
      title='Patient Not Found'
      subtitle='Please double-check the spelling or try another search term.'
    />
  )
}
