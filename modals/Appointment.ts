interface BaseAppointment {
  datetime: string
  actions: string | null | undefined
  treatment_id: number
}

interface Appointment extends BaseAppointment {
  id: number
}

interface AppointmentRequest extends BaseAppointment {
  id?: number | null | undefined
}

export { Appointment, AppointmentRequest }
