import { Treatment } from "../modals/Treatment";

export function treatmentFinished(treatment: Treatment) {
  return treatment.end_date ? new Date() > new Date(treatment.end_date) : false
}

export function getOngoingTreatments(treatments: Treatment[]) {
  const ongoingTreatments = treatments.filter((t) => !treatmentFinished(t))
  ongoingTreatments?.sort((t1, t2) => t2.start_date.localeCompare(t1.start_date))

  return ongoingTreatments
}

export function getPatientTreatments(treatments: Treatment[], patientId: number) {
  treatments = treatments.filter((t) => t.patient_id === patientId)
  treatments.sort((t1, t2) => t2.start_date.localeCompare(t1.start_date))

  return treatments
}