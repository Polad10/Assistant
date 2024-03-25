import axios from "axios";
import { User } from "firebase/auth";
import { Patient, PatientRequest } from "../modals/Patient";
import { Appointment, AppointmentRequest } from "../modals/Appointment";
import { Treatment, TreatmentRequest } from "../modals/Treatment";
import { Payment, PaymentRequest } from "../modals/Payment";
import { Setting } from "../modals/Setting";

export class Api {
  user: User

  signUpApi = '/signUp'
  patientsApi = '/patients'
  appointmentsApi = '/appointments'
  treatmentsApi = '/treatments'
  paymentsApi = '/payments'
  settingsApi = '/settings'

  constructor(user: User) {
    this.user = user

    axios.defaults.timeout = 5000
    axios.defaults.baseURL = 'http://192.168.1.236:3000'
  }

  async signUp() {
    const idToken = await this.user.getIdToken()

    await axios.post(this.signUpApi, {}, { headers: { Authorization: idToken } })
  }

  async fetchPatients() {
    const idToken = await this.user.getIdToken()

    return (await axios.get<Patient[]>(this.patientsApi, { headers: { Authorization: idToken } })).data
  }

  async fetchAppointments() {
    const idToken = await this.user.getIdToken()
    
    return (await axios.get<Appointment[]>(this.appointmentsApi, { headers: { Authorization: idToken } })).data
  }

  async fetchTreatments() {
    const idToken = await this.user.getIdToken()

    return (await axios.get<Treatment[]>(this.treatmentsApi, { headers: { Authorization: idToken } })).data
  }

  async fetchPayments() {
    const idToken = await this.user.getIdToken()

    return (await axios.get<Payment[]>(this.paymentsApi, { headers: { Authorization: idToken } })).data
  }

  async fetchSetting() {
    const idToken = await this.user.getIdToken()

    return (await axios.get<Setting>(this.settingsApi, { headers: { Authorization: idToken } })).data
  }

  async createAppointment(appointment: AppointmentRequest) {
    const idToken = await this.user.getIdToken()

    return (await axios.post<Appointment>(this.appointmentsApi, appointment, { headers: { Authorization: idToken } })).data
  }

  async createPatient(patient: PatientRequest) {
    const idToken = await this.user.getIdToken()

    return (await axios.post<Patient>(this.patientsApi, patient, { headers: { Authorization: idToken } })).data
  }

  async createTreatment(treatment: TreatmentRequest) {
    const idToken = await this.user.getIdToken()

    return (await axios.post<Treatment>(this.treatmentsApi, treatment, { headers: { Authorization: idToken } })).data
  }

  async createPayment(payment: PaymentRequest) {
    const idToken = await this.user.getIdToken()

    return (await axios.post<Payment>(this.paymentsApi, payment, { headers: { Authorization: idToken } })).data
  }

  async createSetting(setting: Setting) {
    const idToken = await this.user.getIdToken()

    return (await axios.post<Setting>(this.settingsApi, setting, { headers: { Authorization: idToken } })).data
  }

  async updateAppointment(appointment: AppointmentRequest) {
    const idToken = await this.user.getIdToken()

    return (await axios.put<Appointment>(this.appointmentsApi, appointment, { headers: { Authorization: idToken } })).data
  }

  async updatePatient(patient: PatientRequest) {
    const idToken = await this.user.getIdToken()

    return (await axios.put<Patient>(this.patientsApi, patient, { headers: { Authorization: idToken } })).data
  }

  async updateTreatment(treatment: TreatmentRequest) {
    const idToken = await this.user.getIdToken()

    return (await axios.put<Treatment>(this.treatmentsApi, treatment, { headers: { Authorization: idToken } })).data
  }

  async updatePayment(payment: PaymentRequest) {
    const idToken = await this.user.getIdToken()

    return (await axios.put<Payment>(this.paymentsApi, payment, { headers: { Authorization: idToken } })).data
  }

  async updateSetting(setting: Setting) {
    const idToken = await this.user.getIdToken()

    return (await axios.put<Setting>(this.settingsApi, setting, { headers: { Authorization: idToken } })).data
  }

  async deleteAppointment(appointmentId: number) {
    const idToken = await this.user.getIdToken()

    const url = `${this.appointmentsApi}/${appointmentId}`
    await axios.delete(url, { headers: { Authorization: idToken } })
  }

  async deletePatient(patientId: number) {
    const idToken = await this.user.getIdToken()

    const url = `${this.patientsApi}/${patientId}`
    await axios.delete(url, { headers: { Authorization: idToken } })
  }

  async deleteTreatment(treatmentId: number) {
    const idToken = await this.user.getIdToken()

    const url = `${this.treatmentsApi}/${treatmentId}`
    await axios.delete(url, { headers: { Authorization: idToken } })
  }

  async deletePayment(paymentId: number) {
    const idToken = await this.user.getIdToken()

    const url = `${this.paymentsApi}/${paymentId}`
    await axios.delete(url, { headers: { Authorization: idToken } })
  }
}