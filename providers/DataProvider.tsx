import axios from 'axios'
import { AppointmentsType, DataContext, PatientsType, PaymentsType, TreatmentsType } from '../contexts/DataContext'
import React, { ReactNode, useState } from 'react'
import Patient from '@polad10/assistant-models/Patient'
import { Appointment, AppointmentRequest } from '@polad10/assistant-models/Appointment'
import Treatment from '@polad10/assistant-models/Treatment'
import Payment from '@polad10/assistant-models/Payment'
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes'

interface DataProviderProps {
  children: ReactNode
}

export default function DataProvider({ children }: DataProviderProps) {
  const [patients, setPatients] = useState<PatientsType>(null)
  const [appointments, setAppointments] = useState<AppointmentsType>(null)
  const [treatments, setTreatments] = useState<TreatmentsType>(null)
  const [payments, setPayments] = useState<PaymentsType>(null)

  const apiBaseUrl = 'http://192.168.1.236:3000'
  const patientsApi = `${apiBaseUrl}/patients`
  const appointmentsApi = `${apiBaseUrl}/appointments`
  const treatmentsApi = `${apiBaseUrl}/treatments`
  const paymentsApi = `${apiBaseUrl}/payments`

  async function fetchPatients() {
    if (!patients) {
      const patients = (await axios.get<Patient[]>(patientsApi)).data

      setPatients(patients)
    }
  }

  async function fetchAppointments() {
    if (!appointments) {
      const appointments = (await axios.get<Appointment[]>(appointmentsApi)).data

      setAppointments(appointments)
    }
  }

  async function createAppointment(appointment: AppointmentRequest) {
    const createdAppointment = (await axios.post<Appointment>(appointmentsApi, appointment)).data

    const appointmentsNew = appointments ? [...appointments] : []
    appointmentsNew?.push(createdAppointment)

    setAppointments(appointmentsNew)
  }

  async function updateAppointment(appointment: AppointmentRequest) {
    const updatedAppointment = (await axios.put<Appointment>(appointmentsApi, appointment)).data

    const appointmentsNew = appointments ? [...appointments].filter((a) => a.id !== appointment.id) : []
    appointmentsNew.push(updatedAppointment)

    setAppointments(appointmentsNew)
  }

  async function deleteAppointment(appointmentId: Int32) {
    const url = `${appointmentsApi}/${appointmentId}`

    await axios.delete(url)

    const appointmentsNew = appointments ? [...appointments].filter((a) => a.id !== appointmentId) : []
    setAppointments(appointmentsNew)
  }

  async function fetchTreatments() {
    if (!treatments) {
      const treatments = (await axios.get<Treatment[]>(treatmentsApi)).data

      setTreatments(treatments)
    }
  }

  async function fetchPayments() {
    if (!payments) {
      const payments = (await axios.get<Payment[]>(paymentsApi)).data

      setPayments(payments)
    }
  }

  return (
    <DataContext.Provider
      value={{
        fetchPatients,
        fetchAppointments,
        createAppointment,
        updateAppointment,
        deleteAppointment,
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
