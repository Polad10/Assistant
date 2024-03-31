const appointment_1 = { id: 1, datetime: '2024-01-01 19:44:00.000Z', actions: null, treatment_id: 1 }
const appointment_2 = { id: 2, datetime: '2024-01-02 19:44:00.000Z', actions: null, treatment_id: 2 }

const patient_1 = {
  id: 1,
  first_name: 'FirstName',
  last_name: 'LastName',
  dob: null,
  city: null,
  phone: null,
  extra_info: null,
}

const patient_2 = {
  id: 2,
  first_name: 'FirstName2',
  last_name: 'LastName2',
  dob: null,
  city: null,
  phone: null,
  extra_info: null,
}

const payment_1 = {
  id: 1,
  date: '2024-01-01 19:44:00.000Z',
  amount: 100,
  treatment_id: 1,
}

const payment_2 = {
  id: 2,
  date: '2024-01-02 19:44:00.000Z',
  amount: 100,
  treatment_id: 2,
}

const treatment_1 = {
  id: 1,
  start_date: '2024-01-01 19:44:00.000Z',
  end_date: null,
  title: 'Title',
  patient_id: 1,
  price: 100,
}

const treatment_2 = {
  id: 2,
  start_date: '2024-01-02 19:44:00.000Z',
  end_date: null,
  title: 'Title2',
  patient_id: 2,
  price: 100,
}

const setting = {
  language: 'en',
}

export const mockModels = {
  appointment_1,
  appointment_2,
  patient_1,
  patient_2,
  payment_1,
  payment_2,
  treatment_1,
  treatment_2,
  setting,
}
