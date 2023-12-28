import { Treatment } from "../modals/Treatment"

export interface TreatmentWithPatientName extends Treatment {
  patientFirstName?: string
  patientLastName?: string
}