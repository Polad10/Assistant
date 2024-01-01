import { RootStackParamList } from '../../types/Navigation'
import NoDataFound from './NoDataView'
import AgendaIllustration from '../illustrations/AgendaIllustration'

type Props = {
  addBtnOnPress: () => void
}

export default function NoAppointments(props: Props) {
  return (
    <NoDataFound
      illustration={<AgendaIllustration />}
      title='No Appointments'
      subtitle="To plan your day, click the '+' button to add a new appointment."
      addBtnTitle='Add Appointment'
      addBtnOnPress={props.addBtnOnPress}
    />
  )
}
