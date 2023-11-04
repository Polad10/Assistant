import Appointment from './Appointment'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'

export default function NewAppointment({ route }: RootStackScreenProps<'NewAppointment'>) {
  const treatment = route.params?.treatment

  return <Appointment mode={Mode.NEW} treatment={treatment} />
}
