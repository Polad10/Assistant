import { I18n } from "i18n-js"

type TranslationKeys = {
  agenda: string
  patients: string
  settings: string
  back: string
  treatments: string
  patient: string
  treatment: string
  appointment: string
  payment: string
  languages: string
  noAppointments: string
  noAppointmentsMessage: string
  addAppointment: string
  noPatients: string
  noPatientsMessage: string
  addPatient: string
  noPayments: string
  noPaymentsMessage: string
  addPayment: string
  noTreatments: string
  noTreatmentsMessage: string
  addTreatment: string
  patientNotFound: string
  patientNotFoundMessage: string
  treatmentNotFound: string
}

type TranslationsType = {
  az: TranslationKeys,
  en: TranslationKeys,
  ru: TranslationKeys
}

const translations: TranslationsType = {
  az: {
    agenda: 'Gündəm',
    patients: 'Xəstələr',
    settings: 'Parametrlər',
    back: 'Geri',
    treatments: 'Müalicələr',
    patient: 'Xəstə',
    treatment: 'Müalicə',
    appointment: 'Görüş',
    payment: 'Ödəniş',
    languages: 'Dillər',
    noAppointments: 'Görüş Yoxdur',
    noAppointmentsMessage: "Gününüzü planlaşdırmaq üçün, '+' düyməsini klikləyib yeni görüş əlavə edin.",
    addAppointment: 'Görüş Əlavə Et',
    noPatients: 'Xəstə Yoxdur',
    noPatientsMessage: "Yeni xəstələr əlavə etmək və onların qeydlərini idarə etmək üçün '+' düyməsini klikləyin.",
    addPatient: 'Xəstə Əlavə Et',
    noPayments: 'Ödəniş Yoxdur',
    noPaymentsMessage: "Müalicəniz üçün ödəniş əlavə etmək üçün '+' düyməsini klikləyin.",
    addPayment: 'Ödəniş Əlavə Et',
    noTreatments: 'Müalicə Yoxdur',
    noTreatmentsMessage: "Xəstəniz üçün müalicə əlavə etmək üçün '+' düyməsini klikləyin.",
    addTreatment: 'Müalicə Əlavə Et',
    patientNotFound: 'Xəstə Tapılmadı',
    patientNotFoundMessage: 'Lütfən, orfoqrafiyanı bir daha yoxlayın və ya başqa axtarış terminini yoxlayın.',
    treatmentNotFound: 'Müalicə Tapılmadı',
  },
  en: {
    agenda: 'Agenda',
    patients: 'Patients',
    settings: 'Settings',
    back: 'Back',
    treatments: 'Treatments',
    patient: 'Patient',
    treatment: 'Treatment',
    appointment: 'Appointment',
    payment: 'Payment',
    languages: 'Languages',
    noAppointments: 'No Appointments',
    noAppointmentsMessage: "To plan your day, click the '+' button to add a new appointment.",
    addAppointment: 'Add Appointment',
    noPatients: 'No Patients',
    noPatientsMessage: "Click the '+' button to add new patients and start managing their records.",
    addPatient: 'Add Patient',
    noPayments: 'No Payments',
    noPaymentsMessage: "Click the '+' button to add a payment for your treatment.",
    addPayment: 'Add Payment',
    noTreatments: 'No Treatments',
    noTreatmentsMessage: "Click the '+' button to add a treatment for your patient.",
    addTreatment: 'Add Treatment',
    patientNotFound: 'Patient Not Found',
    patientNotFoundMessage: 'Please double-check the spelling or try another search term.',
    treatmentNotFound: 'Treatment Not Found',
  },
  ru: {
    agenda: 'Встречи',
    patients: 'Пациенты',
    settings: 'Настройки',
    back: 'Назад',
    treatments: 'Лечения',
    patient: 'Пациент',
    treatment: 'Лечение',
    appointment: 'Встреча',
    payment: 'Оплата',
    languages: 'Языки',
    noAppointments: 'Нет Встреч',
    noAppointmentsMessage: "Чтобы спланировать свой день, нажмите кнопку «+», чтобы добавить новую встречу.",
    addAppointment: 'Добавить Встречу',
    noPatients: 'Нет Пациентов',
    noPatientsMessage: "Нажмите кнопку «+», чтобы добавить новых пациентов и начать управлять их записями.",
    addPatient: 'Добавить Пациента',
    noPayments: 'Нет Платежей',
    noPaymentsMessage: "Нажмите кнопку «+», чтобы добавить оплату за лечение.",
    addPayment: 'Добавить оплату',
    noTreatments: 'Нет Лечений',
    noTreatmentsMessage: "Нажмите кнопку «+», чтобы добавить лечение для вашего пациента.",
    addTreatment: 'Добавить Лечение',
    patientNotFound: 'Пациент не найден',
    patientNotFoundMessage: 'Пожалуйста, проверьте правильность написания или попробуйте другой поисковый запрос.',
    treatmentNotFound: 'Лечение не найдено',
  }
}

const translator = new I18n(translations)
translator.locale = 'az'

export function translate(key: keyof TranslationKeys) {
  return translator.t(key)
}