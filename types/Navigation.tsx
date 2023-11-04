import { StackScreenProps } from '@react-navigation/stack'
import { Patient } from '@polad10/assistant-models/Patient'

export type RootStackParamList = {
  Home: undefined
  NewAppointment: undefined
  NewPatient: undefined
  NewTreatment: { patient?: Patient } | undefined
  EditAppointment: { appointmentId: number }
  Appointments: undefined
  Patients: { pageName: keyof RootStackParamList } | undefined
  Treatments: undefined
  Patient: { patientId: number }
  Treatment: { treatmentId: number }
  NewPayment: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>
