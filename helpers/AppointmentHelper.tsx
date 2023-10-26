import Appointment from '@polad10/assistant-models/Appointment'
import { DateTime } from 'luxon'

export function getGroupedAppointments(appointments: Appointment[]) {
  let groupedAppointments = new Map<string, Appointment[]>()

  for (const appointment of appointments) {
    const date = DateTime.fromISO(appointment.datetime).toISODate()

    if (!date) {
      return null
    }

    if (!groupedAppointments.has(date)) {
      groupedAppointments.set(date, [])
    }

    groupedAppointments.get(date)?.push(appointment)
  }

  groupedAppointments = new Map([...groupedAppointments.entries()].sort())

  for (const [date, appointments] of groupedAppointments) {
    appointments.sort((a1, a2) => {
      return a1.datetime.localeCompare(a2.datetime)
    })
  }

  return groupedAppointments
}
