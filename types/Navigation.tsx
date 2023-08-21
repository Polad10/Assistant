import { StackScreenProps } from '@react-navigation/stack'
import { Status } from '../enums/Status'

export type RootStackParamList = {
  Home: undefined
  NewAppointment: undefined
  NewPatient: undefined
  NewTreatment: { patient?: string }
  EditAppointment: { treatment: string }
  Appointments: undefined
  Patients: { preventDefault?: boolean; pageName: keyof RootStackParamList } | undefined
  Treatments: { preventDefault?: boolean } | undefined
  Patient: { patient: string }
  Treatment: { treatment: string; status: Status; patientName: string; startDate: string }
  NewPayment: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>
