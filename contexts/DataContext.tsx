import { Appointment, AppointmentRequest } from '@polad10/assistant-models/Appointment'
import { Patient, PatientRequest } from '@polad10/assistant-models/Patient'
import { Payment, PaymentRequest } from '@polad10/assistant-models/Payment'
import { Treatment, TreatmentRequest } from '@polad10/assistant-models/Treatment'
import { createContext } from 'react'

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
  deleteAppointment: (appointmentId: number) => Promise<void>

  createPatient: (patient: PatientRequest) => Promise<Patient>
  updatePatient: (patient: PatientRequest) => Promise<Patient>
  deletePatient: (patientId: number) => Promise<void>

  createTreatment: (treatment: TreatmentRequest) => Promise<Treatment>
  updateTreatment: (treatment: TreatmentRequest) => Promise<Treatment>
  deleteTreatment: (treatmentId: number) => Promise<void>

  createPayment: (payment: PaymentRequest) => Promise<Payment>
  updatePayment: (payment: PaymentRequest) => Promise<Payment>
  deletePayment: (paymentId: number) => Promise<void>

  patients: PatientsType
  appointments: AppointmentsType
  treatments: TreatmentsType
  payments: PaymentsType
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
