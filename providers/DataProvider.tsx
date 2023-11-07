import axios from 'axios'
import { AppointmentsType, DataContext, PatientsType, PaymentsType, TreatmentsType } from '../contexts/DataContext'
import { ReactNode, useState } from 'react'
import { Patient, PatientRequest } from '@polad10/assistant-models/Patient'
import { Appointment, AppointmentRequest } from '@polad10/assistant-models/Appointment'
import { Treatment, TreatmentRequest } from '@polad10/assistant-models/Treatment'
import { Payment, PaymentRequest } from '@polad10/assistant-models/Payment'

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

  async function createAppointment(appointment: AppointmentRequest) {
    const createdAppointment = (await axios.post<Appointment>(appointmentsApi, appointment)).data

    const appointmentsNew = appointments ? [...appointments] : []
    appointmentsNew.push(createdAppointment)

    setAppointments(appointmentsNew)

    return createdAppointment
  }

  async function updateAppointment(appointment: AppointmentRequest) {
    const updatedAppointment = (await axios.put<Appointment>(appointmentsApi, appointment)).data

    const appointmentsNew = appointments ? [...appointments].filter((a) => a.id !== appointment.id) : []
    appointmentsNew.push(updatedAppointment)

    setAppointments(appointmentsNew)

    return updatedAppointment
  }

  async function deleteAppointment(appointmentId: number) {
    const url = `${appointmentsApi}/${appointmentId}`

    await axios.delete(url)

    const appointmentsNew = appointments ? [...appointments].filter((a) => a.id !== appointmentId) : []
    setAppointments(appointmentsNew)
  }

  async function createPatient(patient: PatientRequest) {
    const createdPatient = (await axios.post<Patient>(patientsApi, patient)).data

    const patientsNew = patients ? [...patients] : []
    patientsNew.push(createdPatient)

    setPatients(patientsNew)

    return createdPatient
  }

  async function updatePatient(patient: PatientRequest) {
    const updatedPatient = (await axios.put<Patient>(patientsApi, patient)).data

    const patientsNew = patients ? [...patients].filter((p) => p.id !== patient.id) : []
    patientsNew.push(updatedPatient)

    setPatients(patientsNew)

    return updatedPatient
  }

  async function deletePatient(patientId: number) {
    const url = `${patientsApi}/${patientId}`

    await axios.delete(url)

    const patientsNew = patients ? [...patients].filter((p) => p.id !== patientId) : []
    setPatients(patientsNew)
  }

  async function createTreatment(treatment: TreatmentRequest) {
    const createdTreatment = (await axios.post<Treatment>(treatmentsApi, treatment)).data

    const treatmentsNew = treatments ? [...treatments] : []
    treatmentsNew.push(createdTreatment)

    setTreatments(treatmentsNew)

    return createdTreatment
  }

  async function updateTreatment(treatment: TreatmentRequest) {
    const updatedTreatment = (await axios.put<Treatment>(treatmentsApi, treatment)).data

    const treatmentsNew = treatments ? [...treatments].filter((t) => t.id !== treatment.id) : []
    treatmentsNew.push(updatedTreatment)

    setTreatments(treatmentsNew)

    return updatedTreatment
  }

  async function deleteTreatment(treatmentId: number) {
    const url = `${treatmentsApi}/${treatmentId}`

    await axios.delete(url)

    const treatmentsNew = treatments ? [...treatments].filter((t) => t.id !== treatmentId) : []
    setTreatments(treatmentsNew)
  }

  async function createPayment(payment: PaymentRequest) {
    const createdPayment = (await axios.post<Payment>(paymentsApi, payment)).data

    const paymentsNew = payments ? [...payments] : []
    paymentsNew.push(createdPayment)

    setPayments(paymentsNew)

    return createdPayment
  }

  return (
    <DataContext.Provider
      value={{
        fetchPatients,
        fetchAppointments,
        fetchTreatments,
        fetchPayments,

        createAppointment,
        updateAppointment,
        deleteAppointment,

        createPatient,
        updatePatient,
        deletePatient,

        createTreatment,
        updateTreatment,
        deleteTreatment,

        createPayment,

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
