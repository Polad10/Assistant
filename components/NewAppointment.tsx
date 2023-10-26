import Appointment from './Appointment'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'

export default function NewAppointment({ navigation }: RootStackScreenProps<'NewAppointment'>) {
  return <Appointment mode={Mode.NEW} />
}
