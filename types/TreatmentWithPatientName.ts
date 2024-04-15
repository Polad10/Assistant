import { Treatment } from "../models/Treatment"

export interface TreatmentWithPatientName extends Treatment {
  patientFirstName?: string
  patientLastName?: string
}