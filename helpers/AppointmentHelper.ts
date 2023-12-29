import { Appointment } from '../modals/Appointment'
import { DateTime } from 'luxon'
import { Treatment } from '../modals/Treatment'

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

export function getAgendaItems(groupedAppointments: Map<string, Appointment[]>) {
  return groupedAppointments
  ? Array.from(groupedAppointments).map(([date, appointments]) => {
      return {
        title: date,
        data: appointments,
      }
    })
  : []
}

export function getAppointmentsForTreatments(appointments: Appointment[], treatments: Treatment[]) {
  return appointments.filter((a) => treatments.some((t) => t.id === a.treatment_id))
}

export function getOngoingAppointments(appointments: Appointment[]) {
  return appointments.filter((a) => {
    const today = DateTime.local().toISODate()
    const datetime = DateTime.fromISO(a.datetime).toISODate()

    if (!datetime || !today) {
      return false
    }

    return datetime >= today
  })
}