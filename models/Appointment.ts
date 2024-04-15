import { AppointmentStatus } from "../enums/AppointmentStatus"

interface BaseAppointment {
  datetime: string
  actions: string | null | undefined
  treatment_id: number
}

interface Appointment extends BaseAppointment {
  id: number
  status: AppointmentStatus
}

interface AppointmentRequest extends BaseAppointment {
  id?: number | null | undefined
  status?: AppointmentStatus
}

export { Appointment, AppointmentRequest }
