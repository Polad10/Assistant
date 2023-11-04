import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../assets/fontello/config.json'
import { IconProps } from '@rneui/themed'

export default function CustomIcon(props: IconProps) {
  const Icon = createIconSetFromFontello(fontelloConfig, 'Fontello', 'fontello.ttf')

  return <Icon {...props} />
}
