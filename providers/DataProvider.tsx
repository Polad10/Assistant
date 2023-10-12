import axios from 'axios'
import { AppointmentsType, DataContext, PatientsType, PaymentsType, TreatmentsType } from '../contexts/DataContext'
import React, { ReactNode, useState } from 'react'

interface DataProviderProps {
  children: ReactNode
}

export default function DataProvider({ children }: DataProviderProps) {
  const [patients, setPatients] = useState<PatientsType>(null)
  const [appointments, setAppointments] = useState<AppointmentsType>(null)
  const [treatments, setTreatments] = useState<TreatmentsType>(null)
  const [payments, setPayments] = useState<PaymentsType>(null)

  async function fetchPatients() {
    if (!patients) {
      const patients = (await axios.get<Patient[]>('http://192.168.1.236:3000/patients')).data

      setPatients(patients)
    }
  }

  async function fetchAppointments() {
    if (!appointments) {
      const appointments = (await axios.get<Appointment[]>('http://192.168.1.236:3000/appointments')).data

      setAppointments(appointments)
    }
  }

  async function fetchTreatments() {
    if (!treatments) {
      const treatments = (await axios.get<Treatment[]>('http://192.168.1.236:3000/treatments')).data

      setTreatments(treatments)
    }
  }

  async function fetchPayments() {
    if (!payments) {
      const payments = (await axios.get<Payment[]>('http://192.168.1.236:3000/payments')).data

      setPayments(payments)
    }
  }

  return (
    <DataContext.Provider
      value={{
        fetchPatients,
        fetchAppointments,
        fetchTreatments,
        fetchPayments,
        patients,
        appointments,
        treatments,
        payments,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
