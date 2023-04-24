import { StackScreenProps } from '@react-navigation/stack';

export type RootStaskParamList = {
  Home: undefined;
  NewAppointment: undefined;
  NewPatient: undefined;
  NewTreatment: undefined;
  EditAppointment: { treatment: string };
  Appointments: undefined;
  Patients: undefined;
  Treatments: undefined;
};

export type RootStackScreenProps<T extends keyof RootStaskParamList> = StackScreenProps<RootStaskParamList, T>;
