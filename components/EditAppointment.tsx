import { Mode } from '../enums/Mode';
import Appointment from './Appointment';

export default function EditAppointment({ route }: any) {
  const { treatment } = route.params;

  return <Appointment mode={Mode.EDIT} treatment={treatment} />;
}
