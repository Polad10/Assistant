import { DateTime, Settings } from 'luxon'
import { mockModels } from '../__mocks__/MockModels'

const dummyDateTimeNow = DateTime.local(2024, 1, 1, 23, 0, 0)
Settings.now = () => dummyDateTimeNow.toMillis()

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn().mockReturnValue({
    params: {
      appointmentId: mockModels.appointment_1.id,
      patientId: mockModels.patient_1.id,
      paymentId: mockModels.payment_1.id,
      treatmentId: mockModels.treatment_1.id
    }
  }),
  useNavigation: jest.fn().mockReturnValue({
    setOptions: jest.fn()
  })
}))

jest.mock('firebase/auth')
jest.mock('@react-navigation/elements')
jest.mock('@react-native-async-storage/async-storage')
jest.mock('@react-native-community/hooks')

jest.useFakeTimers({now: new Date(2024, 0, 1)})