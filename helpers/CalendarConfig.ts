import { LocaleConfig } from "react-native-calendars"
import { language, translateForLanguage } from "./Translator"

export function configureCalendar() {
  LocaleConfig.locales.az = {
    monthNames: translateForLanguage('monthNames', 'az'),
    monthNamesShort: translateForLanguage('monthNamesShort', 'az'),
    dayNames: translateForLanguage('dayNames', 'az'),
    dayNamesShort: translateForLanguage('dayNamesShort', 'az'),
    today: translateForLanguage('today', 'az')
  }

  LocaleConfig.locales.en = {
    monthNames: translateForLanguage('monthNames', 'en'),
    monthNamesShort: translateForLanguage('monthNamesShort', 'en'),
    dayNames: translateForLanguage('dayNames', 'en'),
    dayNamesShort: translateForLanguage('dayNamesShort', 'en'),
    today: translateForLanguage('today', 'en')
  }

  LocaleConfig.locales.ru = {
    monthNames: translateForLanguage('monthNames', 'ru'),
    monthNamesShort: translateForLanguage('monthNamesShort', 'ru'),
    dayNames: translateForLanguage('dayNames', 'ru'),
    dayNamesShort: translateForLanguage('dayNamesShort', 'ru'),
    today: translateForLanguage('today', 'ru')
  }

  LocaleConfig.defaultLocale = language
}