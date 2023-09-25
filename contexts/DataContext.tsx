import { createContext } from 'react'

export type PatientsType = Patient[] | null
export type AppointmentsType = Appointment[] | null

export interface DataContextType {
  fetchPatients: () => Promise<void>
  fetchAppointments: () => Promise<void>
  patients: PatientsType
  appointments: AppointmentsType
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
