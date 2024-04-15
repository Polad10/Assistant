import { useContext } from 'react'
import ItemAction from './ItemAction'
import { LocalizationContext } from '../../contexts/LocalizationContext'
import { ThemeContext } from '../../contexts/ThemeContext'

type Props = {
  onPress: () => void
}

export default function ItemActionDelete(props: Props) {
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  return (
    <ItemAction
      title={translator.translate('delete')}
      backgroundColor={themeContext.error}
      iconName='trash-outline'
      onPress={props.onPress}
    />
  )
}
