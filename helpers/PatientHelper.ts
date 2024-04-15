import { Patient } from '../models/Patient'

export function getPatientFullName(patient: Patient | undefined) {
  if (patient) {
    return `${patient.first_name} ${patient.last_name}`
  }

  return 'Patient not found'
}

export function sortPatients(patients: Patient[]) {
  const patientsCopy = [...patients]

  return patientsCopy.sort((p1, p2) => {
    return `${p1.first_name} ${p2.last_name}`.localeCompare(`${p2.first_name} ${p2.last_name}`)
  })
}