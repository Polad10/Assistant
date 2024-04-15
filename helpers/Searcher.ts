import Fuse from "fuse.js"
import { TreatmentWithPatientName } from "../types/TreatmentWithPatientName"
import { Patient } from "../models/Patient"

const treatmentSearchOptions = {
  keys: [
    {
      name: 'patientFirstName',
      weight: 2,
    },
    {
      name: 'patientLastName',
      weight: 1,
    },
  ],
}

const patientSearchOptions = {
  keys: [
    {
      name: 'first_name',
      weight: 2,
    },
    {
      name: 'last_name',
      weight: 1,
    },
  ],
}

export function searchTreatments(treatments: TreatmentWithPatientName[], search: string) {
  if(!search) {
    return treatments
  }

  const fuse = new Fuse(treatments, treatmentSearchOptions)

  return fuse.search(search).map((s) => s.item)
}

export function searchPatients(patients: Patient[], search: string) {
  if(!search) {
    return patients
  }

  const fuse = new Fuse(patients, patientSearchOptions)
  
  return fuse.search(search).map((s) => s.item)
}