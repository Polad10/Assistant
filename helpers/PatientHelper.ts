import { Patient } from '../modals/Patient'

export function getPatientFullName(patient: Patient | undefined) {
  if (patient) {
    return `${patient.first_name} ${patient.last_name}`
  }

  return 'Patient not found'
}
