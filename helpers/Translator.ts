import { I18n } from "i18n-js"

export type TranslationKeys = {
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
  edit: string
  save: string
  firstName: string
  enterFirstName: string
  lastName: string
  enterLastName: string
  city: string
  enterCity: string
  phoneNr: string
  enterPhoneNr: string
  extraInfo: string
  enterExtraInfo: string
  enterPatientName: string
  amount: string
  enterAmount: string
  create: string
  general: string
  language: string
  theme: string
  finished: string
  ongoing: string
  price: string
  payments: string
  of: string
  start: string
  end: string
  saved: string
  appointmentAdded: string
  patientAdded: string
  treatmentAdded: string
  paymentAdded: string
  appointmentDeleted: string
  patientDeleted: string
  treatmentDeleted: string
  paymentDeleted: string
}

type TranslationsType = {
  az: TranslationKeys,
  en: TranslationKeys,
  ru: TranslationKeys
}

const translations: TranslationsType = {
  az: {
    agenda: 'Gündəm',
    patients: 'Pasientlər',
    settings: 'Parametrlər',
    back: 'Geri',
    treatments: 'Müalicələr',
    patient: 'Pasient',
    treatment: 'Müalicə',
    appointment: 'Görüş',
    payment: 'Ödəniş',
    languages: 'Dillər',
    noAppointments: 'Görüş Yoxdur',
    noAppointmentsMessage: "Gününüzü planlaşdırmaq üçün, '+' düyməsini klikləyib yeni görüş əlavə edin.",
    addAppointment: 'Görüş Əlavə Et',
    noPatients: 'Pasient Yoxdur',
    noPatientsMessage: "Yeni pasientlər əlavə etmək üçün '+' düyməsini klikləyin.",
    addPatient: 'Pasient Əlavə Et',
    noPayments: 'Ödəniş Yoxdur',
    noPaymentsMessage: "Müalicəniz üçün ödəniş əlavə etmək üçün '+' düyməsini klikləyin.",
    addPayment: 'Ödəniş Əlavə Et',
    noTreatments: 'Müalicə Yoxdur',
    noTreatmentsMessage: "Pasient üçün müalicə əlavə etmək üçün '+' düyməsini klikləyin.",
    addTreatment: 'Müalicə Əlavə Et',
    patientNotFound: 'Pasient Tapılmadı',
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
    dayNamesShort: ['B.', 'B.E.', 'Ç.A.', 'Ç.', 'C.A.', 'C.', 'Ş.'],
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
    edit: 'Dəyiş',
    save: 'Yadda Saxla',
    firstName: 'Ad',
    enterFirstName: 'Adı daxil edin',
    lastName: 'Soyad',
    enterLastName: 'Soyadı daxil edin',
    city: 'Şəhər',
    enterCity: 'Şəhəri daxil edin',
    phoneNr: 'Telefon nömrəsi',
    enterPhoneNr: 'Telefon nömrəsini daxil edin',
    extraInfo: 'Əlavə məlumat',
    enterExtraInfo: 'Əlavə məlumat daxil edin',
    enterPatientName: 'Pasientin adını daxil edin',
    amount: 'Məbləğ',
    enterAmount: 'Məbləği daxil edin',
    create: 'Yarat',
    general: 'Ümumi',
    language: 'Dil',
    theme: 'Tema',
    finished: 'Bitib',
    ongoing: 'Davam edir',
    price: 'Qiymət',
    payments: 'Ödəniş',
    of: '/',
    start: 'Başlanğıc',
    end: 'Bitiş',
    saved: 'Yadda saxlanıldı',
    appointmentAdded: 'Görüş əlavə edildi',
    patientAdded: 'Pasient əlavə edildi',
    treatmentAdded: 'Müalicə əlavə edildi',
    paymentAdded: 'Ödəniş əlavə edildi',
    appointmentDeleted: 'Görüş silindi',
    patientDeleted: 'Pasient silindi',
    treatmentDeleted: 'Müalicə silindi',
    paymentDeleted: 'Ödəniş silindi',
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
    noPatientsMessage: "Click the '+' button to add new patients.",
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
    edit: 'Edit',
    save: 'Save',
    firstName: 'First Name',
    enterFirstName: 'Enter first name',
    lastName: 'Last Name',
    enterLastName: 'Enter last name',
    city: 'City',
    enterCity: 'Enter city',
    phoneNr: 'Phone Number',
    enterPhoneNr: 'Enter phone number',
    extraInfo: 'Extra Info',
    enterExtraInfo: 'Enter extra info',
    enterPatientName: 'Enter patient name',
    amount: 'Amount',
    enterAmount: 'Enter Amount',
    create: 'Create',
    general: 'General',
    language: 'Language',
    theme: 'Theme',
    finished: 'Finished',
    ongoing: 'Ongoing',
    price: 'Price',
    payments: 'Payments',
    of: 'of',
    start: 'Start',
    end: 'End',
    saved: 'Saved',
    appointmentAdded: 'Appointment added',
    patientAdded: 'Patient added',
    treatmentAdded: 'Treatment added',
    paymentAdded: 'Payment added',
    appointmentDeleted: 'Appointment deleted',
    patientDeleted: 'Patient deleted',
    treatmentDeleted: 'Treatment deleted',
    paymentDeleted: 'Payment deleted',
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
    edit: 'Изменить',
    save: 'Сохранить',
    firstName: 'Имя',
    enterFirstName: 'Введите имя',
    lastName: 'Фамилия',
    enterLastName: 'Введите фамилию',
    city: 'Город',
    enterCity: 'Введите город',
    phoneNr: 'Номер телефона',
    enterPhoneNr: 'Введите номер телефона',
    extraInfo: 'Дополнительная информация',
    enterExtraInfo: 'Введите дополнительную информацию',
    enterPatientName: 'Введите имя пациента',
    amount: 'Сумма оплаты',
    enterAmount: 'Введите сумму оплаты',
    create: 'Создать',
    general: 'Общие',
    language: 'Язык',
    theme: 'Тема',
    finished: 'Закончено',
    ongoing: 'В процессе',
    price: 'Цена',
    payments: 'Оплаты',
    of: 'из',
    start: 'Начало',
    end: 'Конец',
    saved: 'Сохранено',
    appointmentAdded: 'Встреча добавлена',
    patientAdded: 'Пациент добавлен',
    treatmentAdded: 'Лечение добавлено',
    paymentAdded: 'Оплата добавлена',
    appointmentDeleted: 'Встреча удалена',
    patientDeleted: 'Пациент удален',
    treatmentDeleted: 'Лечение удалено',
    paymentDeleted: 'Оплата удалена',
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