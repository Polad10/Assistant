import { useKeyboard } from '@react-native-community/hooks'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TextInput } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'

export default function MyKeyboardAvoidingView(props: PropsWithChildren) {
  const scrollRef = useRef<ScrollView>(null)
  const keyboard = useKeyboard()
  const headerHeight = useHeaderHeight()

  const [scrollOffset, setScrollOffset] = useState(0)

  function scrollToInput() {
    const { height: windowHeight } = Dimensions.get('window')
    const keyboardHeight = keyboard.keyboardHeight
    const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput()
    currentlyFocusedInputRef.measure((x, y, width, height, pageX, pageY) => {
      const availableSpace = windowHeight - keyboardHeight
      const availableSpaceMiddle = availableSpace / 2

      const scrollY = pageY - availableSpaceMiddle

      scrollRef.current?.scrollTo({ x: 0, y: scrollOffset + scrollY })
    })
  }

  function handleScroll(event: any) {
    setScrollOffset(event.nativeEvent.contentOffset.y)
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const listener = Keyboard.addListener('keyboardWillShow', scrollToInput)

      return () => {
        listener.remove()
      }
    }
  }, [scrollToInput])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={50 + headerHeight + (StatusBar.currentHeight ?? 0)}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={50}
      >
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
