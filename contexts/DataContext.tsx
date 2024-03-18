import { Api } from '../helpers/Api'
import { Appointment, AppointmentRequest } from '../modals/Appointment'
import { Patient, PatientRequest } from '../modals/Patient'
import { Payment, PaymentRequest } from '../modals/Payment'
import { Treatment, TreatmentRequest } from '../modals/Treatment'
import { Dispatch, SetStateAction, createContext } from 'react'

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

  api: Api | undefined
  setApi: Dispatch<SetStateAction<Api | undefined>>

  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>

  patients: PatientsType
  appointments: AppointmentsType
  treatments: TreatmentsType
  payments: PaymentsType
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
