interface BasePayment {
  date: string
  amount: number
  treatment_id: number
}

interface Payment extends BasePayment {
  id: number
}

interface PaymentRequest extends BasePayment {
  id?: number | null | undefined
}

export { Payment, PaymentRequest }
