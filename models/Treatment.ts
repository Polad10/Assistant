interface BaseTreatment {
  start_date: string
  end_date: string | null | undefined
  title: string
  patient_id: number
  price: number
}

interface Treatment extends BaseTreatment {
  id: number
}

interface TreatmentRequest extends BaseTreatment {
  id?: number | null | undefined
}

export { Treatment, TreatmentRequest }
