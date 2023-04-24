import { Mode } from '../enums/Mode';
import { RootStackScreenProps } from '../types/Navigation';
import Appointment from './Appointment';

export default function EditAppointment({ route }: RootStackScreenProps<'EditAppointment'>) {
  const { treatment } = route.params;

  return <Appointment mode={Mode.EDIT} treatment={treatment} />;
}
