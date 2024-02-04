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
}

const translations = {
  az: {
    agenda: 'Gündəm',
    patients: 'Xəstələr',
    settings: 'Parametrlər',
    back: 'Geri',
    treatments: 'Müalicələr',
    patient: 'Xəstə',
    treatment: 'Müalicə',
    appointment: 'Təyinat',
    payment: 'Ödəniş',
    languages: 'Dillər',
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
  },
  ru: {
    agenda: 'Повестка',
    patients: 'Пациенты',
    settings: 'Настройки',
    back: 'Назад',
    treatments: 'Лечения',
    patient: 'Пациент',
    treatment: 'Лечение',
    appointment: 'Прием',
    payment: 'Оплата',
    languages: 'Языки',
  }
}

const translator = new I18n(translations)
translator.locale = 'az'

export function translate(key: keyof TranslationKeys) {
  return translator.t(key)
}