import { createContext } from 'react'

export type PatientsType = Patient[] | null
export type AppointmentsType = Appointment[] | null
export type TreatmentsType = Treatment[] | null

export interface DataContextType {
  fetchPatients: () => Promise<void>
  fetchAppointments: () => Promise<void>
  fetchTreatments: () => Promise<void>
  patients: PatientsType
  appointments: AppointmentsType
  treatments: TreatmentsType
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
