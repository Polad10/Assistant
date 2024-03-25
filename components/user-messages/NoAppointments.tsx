import UserMessageView from './UserMessageView'
import AgendaIllustration from '../illustrations/AgendaIllustration'
import { useContext } from 'react'
import { LocalizationContext } from '../../contexts/LocalizationContext'

type Props = {
  addBtnOnPress: () => void
}

export default function NoAppointments(props: Props) {
  const localizationContext = useContext(LocalizationContext)!
  const translator = localizationContext.translator

  return (
    <UserMessageView
      illustration={<AgendaIllustration />}
      title={translator.translate('noAppointments')}
      subtitle={translator.translate('noAppointmentsMessage')}
      btnTitle={translator.translate('addAppointment')}
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
