import { I18n } from "i18n-js"
import { azTranslation } from "../localization/AzTranslation"
import { TranslationKeys } from "../localization/TranslationKeys"
import { enTranslation } from "../localization/EnTranslation"
import { ruTranslation } from "../localization/RuTranslation"

type TranslationsType = {
  az: TranslationKeys,
  en: TranslationKeys,
  ru: TranslationKeys
}

const translations: TranslationsType = {
  az: azTranslation,
  en: enTranslation,
  ru: ruTranslation
}

export class Translator {
  translator: I18n

  constructor(language: string) {
    this.translator = new I18n(translations)
    this.translator.locale = language
  }
  
  translate(key: keyof TranslationKeys) {
    return this.translator.t(key)
  }
}