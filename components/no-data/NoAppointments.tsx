import { useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../../types/Navigation'
import NoDataFound from './NoDataView'
import AgendaIllustration from '../illustrations/AgendaIllustration'

type Props = {
  pageName: keyof RootStackParamList
  addBtnOnPress: () => void
}

export default function NoAppointments(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

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
