import NotFoundIllustration from '../illustrations/NotFoundIllustration'
import NoDataView from './NoDataView'

export default function TreatmentsNotFound() {
  return (
    <NoDataView
      illustration={<NotFoundIllustration />}
      title='Treatment Not Found'
      subtitle='Please double-check the spelling or try another search term.'
    />
  )
}
