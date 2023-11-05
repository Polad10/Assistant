import { Appointment, AppointmentRequest } from '@polad10/assistant-models/Appointment'
import { Patient, PatientRequest } from '@polad10/assistant-models/Patient'
import { Payment, PaymentRequest } from '@polad10/assistant-models/Payment'
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

  createAppointment: (appointment: AppointmentRequest) => Promise<Appointment>
  updateAppointment: (appointment: AppointmentRequest) => Promise<Appointment>
  deleteAppointment: (appointmentId: Int32) => Promise<void>

  createPatient: (patient: PatientRequest) => Promise<Patient>
  updatePatient: (patient: PatientRequest) => Promise<Patient>
  deletePatient: (patientId: Int32) => Promise<void>

  createTreatment: (treatment: TreatmentRequest) => Promise<Treatment>

  createPayment: (payment: PaymentRequest) => Promise<Payment>

  patients: PatientsType
  appointments: AppointmentsType
  treatments: TreatmentsType
  payments: PaymentsType
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
