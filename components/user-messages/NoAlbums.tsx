import UserMessageView from './UserMessageView'
import AlbumsIllustration from '../illustrations/AlbumsIllustration'
import { useContext } from 'react'
import { LocalizationContext } from '../../contexts/LocalizationContext'

type Props = {
  addBtnOnPress: () => void
}

export default function NoAlbums(props: Props) {
  const localizationContext = useContext(LocalizationContext)!
  const translator = localizationContext.translator

  return (
    <UserMessageView
      illustration={<AlbumsIllustration />}
      title={translator.translate('noAlbums')}
      subtitle={translator.translate('noAlbumsMessage')}
      btnTitle={translator.translate('addAlbum')}
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
