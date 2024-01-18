import axios from 'axios'
import { AppointmentsType, DataContext, PatientsType, PaymentsType, TreatmentsType } from '../contexts/DataContext'
import { ReactNode, useState } from 'react'
import { Patient, PatientRequest } from '../modals/Patient'
import { Appointment, AppointmentRequest } from '../modals/Appointment'
import { Treatment, TreatmentRequest } from '../modals/Treatment'
import { Payment, PaymentRequest } from '../modals/Payment'

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
    const patients = (await axios.get<Patient[]>(patientsApi)).data

    setPatients(patients)
  }

  async function fetchAppointments() {
    const appointments = (await axios.get<Appointment[]>(appointmentsApi)).data

    setAppointments(appointments)
  }

  async function fetchTreatments() {
    const treatments = (await axios.get<Treatment[]>(treatmentsApi)).data

    setTreatments(treatments)
  }

  async function fetchPayments() {
    const payments = (await axios.get<Payment[]>(paymentsApi)).data

    setPayments(payments)
  }

  async function createAppointment(appointment: AppointmentRequest) {
    const createdAppointment = (await axios.post<Appointment>(appointmentsApi, appointment)).data

    setAppointments((prevAppointments) => {
      const appointmentsNew = prevAppointments ? [...prevAppointments] : []
      appointmentsNew.push(createdAppointment)

      return appointmentsNew
    })

    return createdAppointment
  }

  async function updateAppointment(appointment: AppointmentRequest) {
    const updatedAppointment = (await axios.put<Appointment>(appointmentsApi, appointment)).data

    setAppointments((prevAppointments) => {
      const appointmentsNew = prevAppointments ? [...prevAppointments].filter((a) => a.id !== appointment.id) : []
      appointmentsNew.push(updatedAppointment)

      return appointmentsNew
    })

    return updatedAppointment
  }

  async function deleteAppointment(appointmentId: number) {
    const url = `${appointmentsApi}/${appointmentId}`

    await axios.delete(url)

    setAppointments((prevAppointments) => {
      return prevAppointments ? [...prevAppointments].filter((a) => a.id !== appointmentId) : []
    })
  }

  async function createPatient(patient: PatientRequest) {
    const createdPatient = (await axios.post<Patient>(patientsApi, patient)).data

    setPatients((prevPatients) => {
      const patientsNew = prevPatients ? [...prevPatients] : []
      patientsNew.push(createdPatient)

      return patientsNew
    })

    return createdPatient
  }

  async function updatePatient(patient: PatientRequest) {
    const updatedPatient = (await axios.put<Patient>(patientsApi, patient)).data

    setPatients((prevPatients) => {
      const patientsNew = prevPatients ? [...prevPatients].filter((p) => p.id !== patient.id) : []
      patientsNew.push(updatedPatient)

      return patientsNew
    })

    return updatedPatient
  }

  async function deletePatient(patientId: number) {
    const url = `${patientsApi}/${patientId}`

    await axios.delete(url)

    setPatients((prevPatients) => {
      return prevPatients ? [...prevPatients].filter((p) => p.id !== patientId) : []
    })

    fetchTreatments()
    fetchAppointments()
    fetchPayments()
  }

  async function createTreatment(treatment: TreatmentRequest) {
    const createdTreatment = (await axios.post<Treatment>(treatmentsApi, treatment)).data

    setTreatments((prevTreatments) => {
      const treatmentsNew = prevTreatments ? [...prevTreatments] : []
      treatmentsNew.push(createdTreatment)

      return treatmentsNew
    })

    return createdTreatment
  }

  async function updateTreatment(treatment: TreatmentRequest) {
    const updatedTreatment = (await axios.put<Treatment>(treatmentsApi, treatment)).data

    setTreatments((prevTreatments) => {
      const treatmentsNew = prevTreatments ? [...prevTreatments].filter((t) => t.id !== treatment.id) : []
      treatmentsNew.push(updatedTreatment)

      return treatmentsNew
    })

    return updatedTreatment
  }

  async function deleteTreatment(treatmentId: number) {
    const url = `${treatmentsApi}/${treatmentId}`

    await axios.delete(url)

    setTreatments((prevTreatments) => {
      return prevTreatments ? [...prevTreatments].filter((t) => t.id !== treatmentId) : []
    })

    fetchAppointments()
    fetchPayments()
  }

  async function createPayment(payment: PaymentRequest) {
    const createdPayment = (await axios.post<Payment>(paymentsApi, payment)).data

    setPayments((prevPayments) => {
      const paymentsNew = prevPayments ? [...prevPayments] : []
      paymentsNew.push(createdPayment)

      return paymentsNew
    })

    return createdPayment
  }

  async function updatePayment(payment: PaymentRequest) {
    const updatedPayment = (await axios.put<Payment>(paymentsApi, payment)).data

    setPayments((prevPayments) => {
      const paymentsNew = prevPayments ? [...prevPayments].filter((p) => p.id !== payment.id) : []
      paymentsNew.push(updatedPayment)

      return paymentsNew
    })

    return updatedPayment
  }

  async function deletePayment(paymentId: number) {
    const url = `${paymentsApi}/${paymentId}`

    await axios.delete(url)

    setPayments((prevPayments) => {
      return prevPayments ? [...prevPayments].filter((p) => p.id !== paymentId) : []
    })
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
        updatePayment,
        deletePayment,

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
