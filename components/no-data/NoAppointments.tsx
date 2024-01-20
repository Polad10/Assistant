import UserMessageView from '../UserMessageView'
import AgendaIllustration from '../illustrations/AgendaIllustration'

type Props = {
  addBtnOnPress: () => void
}

export default function NoAppointments(props: Props) {
  return (
    <UserMessageView
      illustration={<AgendaIllustration />}
      title='No Appointments'
      subtitle="To plan your day, click the '+' button to add a new appointment."
      btnTitle='Add Appointment'
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
