import {
  AppointmentsType,
  DataContext,
  PatientsType,
  PaymentsType,
  SettingType,
  TreatmentsType,
} from '../contexts/DataContext'
import { ReactNode, useContext, useState } from 'react'
import { PatientRequest } from '../models/Patient'
import { AppointmentRequest } from '../models/Appointment'
import { TreatmentRequest } from '../models/Treatment'
import { PaymentRequest } from '../models/Payment'
import { Api } from '../helpers/Api'
import { Setting } from '../models/Setting'
import AsyncStorageHelper from '../helpers/AsyncStorageHelper'
import { DateTime } from 'luxon'
import { AppointmentStatus } from '../enums/AppointmentStatus'

interface DataProviderProps {
  children: ReactNode
}

export default function DataProvider({ children }: DataProviderProps) {
  const [patients, setPatients] = useState<PatientsType>(null)
  const [appointments, setAppointments] = useState<AppointmentsType>(null)
  const [treatments, setTreatments] = useState<TreatmentsType>(null)
  const [payments, setPayments] = useState<PaymentsType>(null)
  const [setting, setSetting] = useState<SettingType>(null)

  const [api, setApi] = useState<Api>()
  const [loading, setLoading] = useState(false)

  async function fetchPatients() {
    const patients = await api!.fetchPatients()

    setPatients(patients)
  }

  async function fetchAppointments() {
    let appointments = await api!.fetchAppointments()

    appointments = appointments.map((a) => {
      const dateIsPast = DateTime.fromISO(a.datetime).toISODate()! < DateTime.local().toISODate()!

      if (dateIsPast && a.status == AppointmentStatus.Expected) {
        a.status = AppointmentStatus.Finished
      }

      return a
    })

    setAppointments(appointments)
  }

  async function fetchTreatments() {
    const treatments = await api!.fetchTreatments()

    setTreatments(treatments)
  }

  async function fetchPayments() {
    const payments = await api!.fetchPayments()

    setPayments(payments)
  }

  async function fetchSetting() {
    const setting = (await AsyncStorageHelper.getSetting()) || (await api!.fetchSetting())

    setSetting(setting)
    AsyncStorageHelper.setSetting(setting)
  }

  async function createAppointment(appointment: AppointmentRequest) {
    const createdAppointment = await api!.createAppointment(appointment)

    setAppointments((prevAppointments) => {
      const appointmentsNew = prevAppointments ? [...prevAppointments] : []
      appointmentsNew.push(createdAppointment)

      return appointmentsNew
    })

    return createdAppointment
  }

  async function updateAppointment(appointment: AppointmentRequest) {
    const updatedAppointment = await api!.updateAppointment(appointment)

    setAppointments((prevAppointments) => {
      const appointmentsNew = prevAppointments ? [...prevAppointments].filter((a) => a.id !== appointment.id) : []
      appointmentsNew.push(updatedAppointment)

      return appointmentsNew
    })

    return updatedAppointment
  }

  async function deleteAppointment(appointmentId: number) {
    await api!.deleteAppointment(appointmentId)

    setAppointments((prevAppointments) => {
      return prevAppointments ? [...prevAppointments].filter((a) => a.id !== appointmentId) : []
    })
  }

  async function createPatient(patient: PatientRequest) {
    const createdPatient = await api!.createPatient(patient)

    setPatients((prevPatients) => {
      const patientsNew = prevPatients ? [...prevPatients] : []
      patientsNew.push(createdPatient)

      return patientsNew
    })

    return createdPatient
  }

  async function updatePatient(patient: PatientRequest) {
    const updatedPatient = await api!.updatePatient(patient)

    setPatients((prevPatients) => {
      const patientsNew = prevPatients ? [...prevPatients].filter((p) => p.id !== patient.id) : []
      patientsNew.push(updatedPatient)

      return patientsNew
    })

    return updatedPatient
  }

  async function deletePatient(patientId: number) {
    await api!.deletePatient(patientId)

    setPatients((prevPatients) => {
      return prevPatients ? [...prevPatients].filter((p) => p.id !== patientId) : []
    })

    fetchTreatments()
    fetchAppointments()
    fetchPayments()
  }

  async function createTreatment(treatment: TreatmentRequest) {
    const createdTreatment = await api!.createTreatment(treatment)

    setTreatments((prevTreatments) => {
      const treatmentsNew = prevTreatments ? [...prevTreatments] : []
      treatmentsNew.push(createdTreatment)

      return treatmentsNew
    })

    return createdTreatment
  }

  async function updateTreatment(treatment: TreatmentRequest) {
    const updatedTreatment = await api!.updateTreatment(treatment)

    setTreatments((prevTreatments) => {
      const treatmentsNew = prevTreatments ? [...prevTreatments].filter((t) => t.id !== treatment.id) : []
      treatmentsNew.push(updatedTreatment)

      return treatmentsNew
    })

    return updatedTreatment
  }

  async function deleteTreatment(treatmentId: number) {
    await api!.deleteTreatment(treatmentId)

    setTreatments((prevTreatments) => {
      return prevTreatments ? [...prevTreatments].filter((t) => t.id !== treatmentId) : []
    })

    fetchAppointments()
    fetchPayments()
  }

  async function createPayment(payment: PaymentRequest) {
    const createdPayment = await api!.createPayment(payment)

    setPayments((prevPayments) => {
      const paymentsNew = prevPayments ? [...prevPayments] : []
      paymentsNew.push(createdPayment)

      return paymentsNew
    })

    return createdPayment
  }

  async function updatePayment(payment: PaymentRequest) {
    const updatedPayment = await api!.updatePayment(payment)

    setPayments((prevPayments) => {
      const paymentsNew = prevPayments ? [...prevPayments].filter((p) => p.id !== payment.id) : []
      paymentsNew.push(updatedPayment)

      return paymentsNew
    })

    return updatedPayment
  }

  async function deletePayment(paymentId: number) {
    await api!.deletePayment(paymentId)

    setPayments((prevPayments) => {
      return prevPayments ? [...prevPayments].filter((p) => p.id !== paymentId) : []
    })
  }

  async function createSetting(setting: Setting) {
    setSetting(setting)

    await api!.createSetting(setting)

    AsyncStorageHelper.setSetting(setting)
  }

  async function updateSetting(setting: Setting) {
    setSetting(setting)

    await api!.updateSetting(setting)

    AsyncStorageHelper.setSetting(setting)
  }

  return (
    <DataContext.Provider
      value={{
        fetchPatients,
        fetchAppointments,
        fetchTreatments,
        fetchPayments,
        fetchSetting,

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

        createSetting,
        updateSetting,

        api,
        setApi,

        loading,
        setLoading,

        patients,
        appointments,
        treatments,
        payments,
        setting,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
