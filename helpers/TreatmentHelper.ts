import { Treatment } from "../models/Treatment";

export function treatmentFinished(treatment: Treatment) {
  return treatment.end_date ? new Date() > new Date(treatment.end_date) : false
}

export function getOngoingTreatments(treatments: Treatment[]) {
  const ongoingTreatments = treatments.filter((t) => !treatmentFinished(t))
  sortTreatments(ongoingTreatments)

  return ongoingTreatments
}

export function getPatientTreatments(treatments: Treatment[], patientId: number) {
  treatments = treatments.filter((t) => t.patient_id === patientId)
  sortTreatments(treatments)

  return treatments
}

function sortTreatments(treatments: Treatment[]) {
  treatments.sort((t1, t2) => t2.start_date.localeCompare(t1.start_date)) 
}