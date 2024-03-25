import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { Translator } from '../helpers/Translator'
import { DataContext } from '../contexts/DataContext'

export default function LocalizationProvider({ children }: PropsWithChildren) {
  const dataContext = useContext(DataContext)!

  const [language, setLanguage] = useState('az')
  const [translator, setTranslator] = useState(new Translator(language))

  useEffect(() => {
    const language = dataContext.setting?.language

    if (language) {
      setLanguage(language)
      setTranslator(new Translator(language))
    }
  }, [dataContext.setting?.language])

  return <LocalizationContext.Provider value={{ language, translator }}>{children}</LocalizationContext.Provider>
}
