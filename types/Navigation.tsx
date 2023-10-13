import { StackScreenProps } from '@react-navigation/stack'
import { Status } from '../enums/Status'

export type RootStackParamList = {
  Home: undefined
  NewAppointment: undefined
  NewPatient: undefined
  NewTreatment: { patient?: Patient }
  EditAppointment: { appointmentId: number }
  Appointments: undefined
  Patients: { preventDefault?: boolean; pageName: keyof RootStackParamList } | undefined
  Treatments: { preventDefault?: boolean } | undefined
  Patient: { patientId: number }
  Treatment: { treatmentId: number }
  NewPayment: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>
