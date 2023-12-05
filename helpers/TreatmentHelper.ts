import { Treatment } from "../modals/Treatment";

export function treatmentFinished(treatment: Treatment) {
  return treatment.end_date ? new Date() > new Date(treatment.end_date) : false
}