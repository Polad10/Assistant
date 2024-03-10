import { translate } from '../../helpers/Translator'
import UserMessageView from './UserMessageView'
import AgendaIllustration from '../illustrations/AgendaIllustration'

type Props = {
  addBtnOnPress: () => void
}

export default function NoAppointments(props: Props) {
  return (
    <UserMessageView
      illustration={<AgendaIllustration />}
      title={translate('noAppointments')}
      subtitle={translate('noAppointmentsMessage')}
      btnTitle={translate('addAppointment')}
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
