import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native'

type Props = {
  children: ReactNode
  focusedInputIndex: number
}

export default function MyKeyboardAvoidingView(props: Props) {
  const scrollRef = useRef<ScrollView>(null)

  const scrollToInput = useCallback(() => {
    scrollRef.current?.scrollTo({ x: 0, y: 120 * props.focusedInputIndex })
  }, [props.focusedInputIndex])

  useEffect(() => {
    const listener = Keyboard.addListener('keyboardWillShow', scrollToInput)

    return () => {
      listener.remove()
    }
  }, [scrollToInput])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={150}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef}>
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
