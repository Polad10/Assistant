import { StackScreenProps } from '@react-navigation/stack'
import Patient from '@polad10/assistant-models/Patient'

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
