import { Payment } from "../modals/Payment";
import { Treatment } from "../modals/Treatment";

export function getTotalPayment(payments: Payment[]) {
  return payments.reduce((sum, payment) => Number(sum) + Number(payment.amount), 0)
}

export function getTreatmentPayments(payments: Payment[], treatmentId: number) {
  const treatmentPayments = payments.filter((p) => p.treatment_id === treatmentId)
  sortPayments(treatmentPayments)

  return treatmentPayments
}

export function getPaymentsForTreatments(payments: Payment[], treatments: Treatment[]) {
  const paymentsForTreatments = payments.filter((p) => treatments?.some((t) => t.id === p.treatment_id))
  sortPayments(paymentsForTreatments)

  return paymentsForTreatments
}

function sortPayments(payments: Payment[]) {
  payments.sort((p1, p2) => p2.date.localeCompare(p1.date))
}