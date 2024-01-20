import UserMessageView from './UserMessageView'
import ErrorIllustration from './illustrations/ErrorIllustration'

type Props = {
  onBtnPress: () => void
}

export default function Error(props: Props) {
  return (
    <UserMessageView
      illustration={<ErrorIllustration />}
      title='Oops!'
      subtitle="Something went wrong. Don't worry, let's try again."
      btnTitle='Try Again'
      onBtnPress={props.onBtnPress}
    />
  )
}
