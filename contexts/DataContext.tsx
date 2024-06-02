import { Api } from '../helpers/Api'
import { Album, AlbumRequest } from '../models/Album'
import { Appointment, AppointmentRequest } from '../models/Appointment'
import { Patient, PatientRequest } from '../models/Patient'
import { Payment, PaymentRequest } from '../models/Payment'
import { Setting } from '../models/Setting'
import { Treatment, TreatmentRequest } from '../models/Treatment'
import { Dispatch, SetStateAction, createContext } from 'react'

export type PatientsType = Patient[] | null
export type AppointmentsType = Appointment[] | null
export type TreatmentsType = Treatment[] | null
export type PaymentsType = Payment[] | null
export type AlbumsType = Album[] | null
export type SettingType = Setting | null

export interface DataContextType {
  fetchPatients: () => Promise<void>
  fetchAppointments: () => Promise<void>
  fetchTreatments: () => Promise<void>
  fetchPayments: () => Promise<void>
  fetchAlbums: () => Promise<void>
  fetchSetting: () => Promise<void>

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

  createAlbum: (album: AlbumRequest) => Promise<Album>
  updateAlbum: (album: AlbumRequest) => Promise<Album>
  deleteAlbum: (albumId: number) => Promise<void>

  createSetting: (setting: Setting) => Promise<void>
  updateSetting: (setting: Setting) => Promise<void>

  api: Api | undefined
  setApi: Dispatch<SetStateAction<Api | undefined>>

  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>

  patients: PatientsType
  appointments: AppointmentsType
  treatments: TreatmentsType
  payments: PaymentsType
  albums: AlbumsType
  setting: SettingType
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
