import { createContext } from 'react'

export type PatientsType = Patient[] | null

export interface DataContextType {
  fetchPatients: () => Promise<void>
  patients: PatientsType
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
