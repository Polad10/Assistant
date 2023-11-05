import { StackScreenProps } from '@react-navigation/stack'
import { Patient } from '@polad10/assistant-models/Patient'
import { Treatment } from '@polad10/assistant-models/Treatment'

export type RootStackParamList = {
  Home: undefined
  NewAppointment: { treatment?: Treatment } | undefined
  NewPatient: undefined
  NewTreatment: { patient?: Patient } | undefined
  EditAppointment: { appointmentId: number }
  EditPatient: {patientId: number}
  Appointments: undefined
  Patients: { pageName: keyof RootStackParamList } | undefined
  Treatments: undefined
  Patient: { patientId: number }
  Treatment: { treatmentId: number }
  NewPayment: { treatmentId: number }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>
