import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  NewAppointment: undefined;
  NewPatient: undefined;
  NewTreatment: undefined;
  EditAppointment: { treatment: string };
  Appointments: undefined;
  Patients: undefined;
  Treatments: undefined;
  Patient: { patient: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;
