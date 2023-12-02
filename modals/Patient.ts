interface BasePatient {
  first_name: string
  last_name: string
  city: string | null | undefined
  phone: string | null | undefined
  extra_info: string | null | undefined
}

interface Patient extends BasePatient {
  id: number
}

interface PatientRequest extends BasePatient {
  id?: number | null | undefined
}

export { Patient, PatientRequest }
