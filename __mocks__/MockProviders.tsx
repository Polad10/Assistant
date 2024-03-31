import { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { Translator } from '../helpers/Translator'
import { AppointmentRequest } from '../modals/Appointment'
import { PatientRequest } from '../modals/Patient'
import { Setting } from '../modals/Setting'
import { TreatmentRequest } from '../modals/Treatment'
import { PaymentRequest } from '../modals/Payment'
import { Api } from '../helpers/Api'
import { mockModels } from './MockModels'
import { AuthContext } from '../contexts/AuthContext'
import { DataContext } from '../contexts/DataContext'
import { ThemeContext } from '../contexts/ThemeContext'
import { LocalizationContext } from '../contexts/LocalizationContext'

const themeContextMock = {
  primary: '#121212',
  secondary: '#1a1a1a',
  accent: '#7600eb',
  neutral: '#faf8ff',
  border: '#374151',
  info: '#d3fbd8',
  success: '#00e5b0',
  warning: '#9f1239',
  error: '#9f1239',
}

const localizationContextMock = {
  translator: new Translator('en'),
  language: 'en',
}

const authContextMock = {
  user: undefined,
  loading: false,
}

const dataContextMock = {
  fetchPatients: async () => {},
  fetchAppointments: async () => {},
  fetchTreatments: async () => {},
  fetchPayments: async () => {},
  fetchSetting: async () => {},

  createAppointment: async (appointmentRequest: AppointmentRequest) => mockModels.appointment_1,
  updateAppointment: async (appointmentRequest: AppointmentRequest) => mockModels.appointment_1,
  deleteAppointment: async (appointmentId: number) => {},

  createPatient: async (patientRequest: PatientRequest) => mockModels.patient_1,
  updatePatient: async (patientRequest: PatientRequest) => mockModels.patient_1,
  deletePatient: async (patientId: number) => {},

  createTreatment: async (treatmentRequest: TreatmentRequest) => mockModels.treatment_1,
  updateTreatment: async (treatmentRequest: TreatmentRequest) => mockModels.treatment_1,
  deleteTreatment: async (treatmentId: number) => {},

  createPayment: async (paymentRequest: PaymentRequest) => mockModels.payment_1,
  updatePayment: async (paymentRequest: PaymentRequest) => mockModels.payment_1,
  deletePayment: async (paymentId: number) => {},

  createSetting: async (setting: Setting) => {},
  updateSetting: async (setting: Setting) => {},

  api: undefined,
  setApi: (action: SetStateAction<Api | undefined>): Dispatch<SetStateAction<Api | undefined>> => jest.fn(),

  loading: false,
  setLoading: (action: SetStateAction<boolean>): Dispatch<SetStateAction<boolean>> => jest.fn(),

  patients: [mockModels.patient_1, mockModels.patient_2],
  appointments: [mockModels.appointment_1, mockModels.appointment_2],
  treatments: [mockModels.treatment_1, mockModels.treatment_2],
  payments: [mockModels.payment_1, mockModels.payment_2],
  setting: mockModels.setting,
}

export default function MockProviders({ children }: PropsWithChildren) {
  return (
    <AuthContext.Provider value={authContextMock}>
      <DataContext.Provider value={dataContextMock}>
        <ThemeContext.Provider value={themeContextMock}>
          <LocalizationContext.Provider value={localizationContextMock}>{children}</LocalizationContext.Provider>
        </ThemeContext.Provider>
      </DataContext.Provider>
    </AuthContext.Provider>
  )
}
