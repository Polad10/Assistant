import { Patient } from '@polad10/assistant-models/Patient'

export function getPatientFullName(patient: Patient | undefined) {
  if (patient) {
    return `${patient.first_name} ${patient.last_name}`
  }

  return 'Patient not found'
}
