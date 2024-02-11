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
  date: string
  time: string
  actions: string
  pickDate: string
  pickTime: string
  enterActions: string
  selectTreatment: string
  dayNames: string[]
  dayNamesShort: string[]
  monthNames: string[]
  monthNamesShort: string[]
  today: string
  delete: string
  cancel: string
  oops: string
  tryAgain: string
  tryAgainMessage: string
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
    date: 'Tarix',
    time: 'Vaxt',
    actions: 'Tədbirlər',
    pickDate: 'Tarix seçin',
    pickTime: 'Vaxt seçin',
    enterActions: 'Tədbirləri daxil edin',
    selectTreatment: 'Müalicəni seçin',
    dayNames: ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'],
    dayNamesShort: ['B.', 'B.e.', 'Ç.a.', 'Ç.', 'C.a.', 'C.', 'Ş.'],
    monthNames: [
      'Yanvar',
      'Fevral',
      'Mart',
      'Aprel',
      'May',
      'İyun',
      'İyul',
      'Avqust',
      'Sentyabr',
      'Oktyabr',
      'Noyabr',
      'Dekabr'
    ],
    monthNamesShort: [
      'Yan',
      'Fev',
      'Mar',
      'Apr',
      'May',
      'İyn',
      'İyl',
      'Avq',
      'Sen',
      'Okt',
      'Noy',
      'Dek'
    ],
    today: 'Bu gün',
    delete: 'Sil',
    cancel: 'Ləğv et',
    oops: 'Vay!',
    tryAgain: 'Yenidən Sına',
    tryAgainMessage: 'Nə isə səhv getdi. Narahat olma, bir daha cəhd edək.',
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
    date: 'Date',
    time: 'Time',
    actions: 'Actions',
    pickDate: 'Pick a date',
    pickTime: 'Pick a time',
    enterActions: 'Enter actions',
    selectTreatment: 'Select a treatment',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    today: 'Today',
    delete: 'Delete',
    cancel: 'Cancel',
    oops: 'Oops!',
    tryAgain: 'Try Again',
    tryAgainMessage: "Something went wrong. Don't worry, let's try again.",
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
    date: 'Дата',
    time: 'Время',
    actions: 'Действия',
    pickDate: 'Выберите дату',
    pickTime: 'Выберите время',
    enterActions: 'Введите действия',
    selectTreatment: 'Выберите лечение',
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ],
    monthNamesShort: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек'
    ],
    today: 'Сегодня',
    delete: 'Удалить',
    cancel: 'Отменить',
    oops: 'Упс!',
    tryAgain: 'Попробуй Снова',
    tryAgainMessage: 'Что-то пошло не так. Не волнуйся, попробуем еще раз.',
  }
}

export let language = 'az'

const translator = new I18n(translations)
translator.locale = language

export function translate(key: keyof TranslationKeys) {
  return translator.t(key)
}

export function translateForLanguage(key: keyof TranslationKeys, language: keyof TranslationsType) {
  return translator.t(key, {lng: language})
}