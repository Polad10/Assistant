import { StackScreenProps } from '@react-navigation/stack'
import { Patient } from '../models/Patient'
import { Treatment } from '../models/Treatment'

export type RootStackParamList = {
  Home: undefined
  NewAppointment: { treatment?: Treatment, patient?: Patient } | undefined
  NewPatient: undefined
  NewTreatment: { patient?: Patient } | undefined
  EditAppointment: { appointmentId: number }
  EditPatient: { patientId: number }
  EditTreatment: { treatmentId: number }
  EditPayment: { paymentId: number }
  Appointments: undefined
  Patients: { pageName: keyof RootStackParamList } | undefined
  Treatments: { patient?: Patient } | undefined
  Patient: { patientId: number }
  Treatment: { treatmentId: number }
  NewPayment: { treatmentId?: number, patient?: Patient }
  Settings: undefined
  Languages: undefined
  Welcome: undefined
  Login: undefined
  Signup: undefined
  ForgotPassword: undefined
  EmailSent: {email: string}
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>
