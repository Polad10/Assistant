import { LocaleConfig } from "react-native-calendars"
import { Translator } from "./Translator"

export function configureCalendar(defaultLocale: string) {
  const azTranslator = new Translator('az')
  const enTranslator = new Translator('en')
  const ruTranslator = new Translator('ru')

  LocaleConfig.locales.az = {
    monthNames: azTranslator.translate('monthNames'),
    monthNamesShort: azTranslator.translate('monthNamesShort'),
    dayNames: azTranslator.translate('dayNames'),
    dayNamesShort: azTranslator.translate('dayNamesShort'),
    today: azTranslator.translate('today')
  }

  LocaleConfig.locales.en = {
    monthNames: enTranslator.translate('monthNames'),
    monthNamesShort: enTranslator.translate('monthNamesShort'),
    dayNames: enTranslator.translate('dayNames'),
    dayNamesShort: enTranslator.translate('dayNamesShort'),
    today: enTranslator.translate('today')
  }

  LocaleConfig.locales.ru = {
    monthNames: ruTranslator.translate('monthNames'),
    monthNamesShort: ruTranslator.translate('monthNamesShort'),
    dayNames: ruTranslator.translate('dayNames'),
    dayNamesShort: ruTranslator.translate('dayNamesShort'),
    today: ruTranslator.translate('today')
  }

  LocaleConfig.defaultLocale = defaultLocale
}