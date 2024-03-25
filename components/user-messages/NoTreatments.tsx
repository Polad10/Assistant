import UserMessageView from './UserMessageView'
import TreatmentsIllustration from '../illustrations/TreatmentsIllustration'
import { useContext } from 'react'
import { LocalizationContext } from '../../contexts/LocalizationContext'

type Props = {
  addBtnOnPress: () => void
}

export default function NoTreatments(props: Props) {
  const localizationContext = useContext(LocalizationContext)!
  const translator = localizationContext.translator

  return (
    <UserMessageView
      illustration={<TreatmentsIllustration />}
      title={translator.translate('noTreatments')}
      subtitle={translator.translate('noTreatmentsMessage')}
      btnTitle={translator.translate('addTreatment')}
      onBtnPress={props.addBtnOnPress}
      iconName='add'
    />
  )
}
