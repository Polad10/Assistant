import NotFoundIllustration from '../illustrations/NotFoundIllustration'
import NoDataView from './NoDataView'

export default function PatientsNotFound() {
  return (
    <NoDataView
      illustration={<NotFoundIllustration />}
      title='Patient Not Found'
      subtitle='Please double-check the spelling or try another search term.'
    />
  )
}
