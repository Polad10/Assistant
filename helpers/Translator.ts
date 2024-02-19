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
  english: string
  azerbaijani: string
  russian: string
  dark: string
  light: string
  startDate: string
  endDate: string
  title: string
  enterTitle: string
  selectPatient: string
  dob: string
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
    pickTime: 'Vaxt seçin',
    enterActions: 'Dişlərin təmizlənməsi, diş kronlarının qoyulması.',
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
    enterFirstName: 'Yeganə',
    lastName: 'Soyad',
    enterLastName: 'Məmmədova',
    city: 'Şəhər',
    enterCity: 'Bakı',
    phoneNr: 'Telefon nömrəsi',
    enterPhoneNr: '050 123 45 67',
    extraInfo: 'Əlavə məlumat',
    enterExtraInfo: 'Poladın dostu.',
    enterPatientName: 'Pasientin adını daxil edin',
    amount: 'Məbləğ',
    enterAmount: '100',
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
    english: 'Ingilis',
    azerbaijani: 'Azərbaycan',
    russian: 'Rus',
    dark: 'Tünd',
    light: 'Açıq',
    startDate: 'Başlanğıc tarixi',
    endDate: 'Bitmə tarixi',
    title: 'Başlıq',
    enterTitle: 'Dişlərin təmizlənməsi və yoxlanılması',
    selectPatient: 'Pasienti seçin',
    dob: 'Doğum tarixi',
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
    pickTime: 'Pick a time',
    enterActions: 'Teeth cleaning, dental crowns placement.',
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
    enterFirstName: 'Egana',
    lastName: 'Last Name',
    enterLastName: 'Mammadova',
    city: 'City',
    enterCity: 'Baku',
    phoneNr: 'Phone Number',
    enterPhoneNr: '050 123 45 67',
    extraInfo: 'Extra Info',
    enterExtraInfo: 'A friend of Polad.',
    enterPatientName: "Enter patient's name",
    amount: 'Amount',
    enterAmount: '100',
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
    english: 'English',
    azerbaijani: 'Azerbaijani',
    russian: 'Russian',
    dark: 'Dark',
    light: 'Light',
    startDate: 'Start date',
    endDate: 'End date',
    title: 'Title',
    enterTitle: 'Dental cleaning and check-up',
    selectPatient: 'Select patient',
    dob: 'Date of birth',
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
    pickTime: 'Выберите время',
    enterActions: 'Чистка зубов, установка зубных коронок.',
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
    enterFirstName: 'Егана',
    lastName: 'Фамилия',
    enterLastName: 'Мамедова',
    city: 'Город',
    enterCity: 'Баку',
    phoneNr: 'Номер телефона',
    enterPhoneNr: '050 123 45 67',
    extraInfo: 'Дополнительная информация',
    enterExtraInfo: 'Друг Полада.',
    enterPatientName: 'Введите имя пациента',
    amount: 'Сумма оплаты',
    enterAmount: '100',
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
    english: 'Английский',
    azerbaijani: 'Азербайджанский',
    russian: 'Русский',
    dark: 'Темная',
    light: 'Светлая',
    startDate: 'Дата начала',
    endDate: 'Дата завершения',
    title: 'Заголовок',
    enterTitle: 'Чистка и осмотр зубов',
    selectPatient: 'Выберите пациента',
    dob: 'Дата рождения',
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