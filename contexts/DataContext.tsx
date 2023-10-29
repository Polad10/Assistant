import { Appointment, AppointmentRequest } from '@polad10/assistant-models/Appointment'
import Patient from '@polad10/assistant-models/Patient'
import Payment from '@polad10/assistant-models/Payment'
import { Treatment, TreatmentRequest } from '@polad10/assistant-models/Treatment'
import { createContext } from 'react'
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes'

export type PatientsType = Patient[] | null
export type AppointmentsType = Appointment[] | null
export type TreatmentsType = Treatment[] | null
export type PaymentsType = Payment[] | null

export interface DataContextType {
  fetchPatients: () => Promise<void>
  fetchAppointments: () => Promise<void>
  fetchTreatments: () => Promise<void>
  fetchPayments: () => Promise<void>

  createAppointment: (appointment: AppointmentRequest) => Promise<void>
  updateAppointment: (appointment: AppointmentRequest) => Promise<void>
  deleteAppointment: (appointmentId: Int32) => Promise<void>

  createTreatment: (treatment: TreatmentRequest) => Promise<Treatment>

  patients: PatientsType
  appointments: AppointmentsType
  treatments: TreatmentsType
  payments: PaymentsType
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
