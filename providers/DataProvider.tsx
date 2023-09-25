import axios from 'axios'
import { DataContext, PatientsType } from '../contexts/DataContext'
import React, { ReactNode, useState } from 'react'

interface DataProviderProps {
  children: ReactNode
}

export default function DataProvider({ children }: DataProviderProps) {
  const [patients, setPatients] = useState<PatientsType>(null)

  async function fetchPatients() {
    if (!patients) {
      const patients = (await axios.get<Patient[]>('http://192.168.1.236:3000/patients')).data

      setPatients(patients)
    }
  }

  return <DataContext.Provider value={{ fetchPatients, patients }}>{children}</DataContext.Provider>
}
