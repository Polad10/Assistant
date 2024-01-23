import { View, StyleProp, ViewStyle, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import MyInput from './MyInput'
import { forwardRef, useContext, useImperativeHandle, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { DateTime } from 'luxon'
import IonIcons from '@expo/vector-icons/Ionicons'
import { ThemeContext } from '../contexts/ThemeContext'

type Props = {
  label?: string
  placeholder?: string
  time?: Date
  onChange?: () => void
  showError?: boolean
  style?: StyleProp<ViewStyle>
  onFocus?: () => void
}

type TimeInputRefType = {
  getTime: () => Date | undefined
}

const TimeInput = forwardRef((props: Props, ref) => {
  const themeContext = useContext(ThemeContext)!

  let initialTime = props.time ? DateTime.fromJSDate(props.time).toLocaleString(DateTime.TIME_24_SIMPLE) : undefined
  initialTime ??= undefined

  const [time, setTime] = useState(initialTime)
  const [showTimePicker, setShowTimePicker] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      getTime,
    }
  })

  function getTime() {
    const timeVal = time ?? ''
    const timeObj = DateTime.fromFormat(timeVal, 'HH:mm')

    return timeObj.isValid ? timeObj.toJSDate() : undefined
  }

  function handleConfirm(dateTime: Date) {
    setTime(DateTime.fromJSDate(dateTime).toLocaleString(DateTime.TIME_24_SIMPLE))
    props.onChange?.()

    setShowTimePicker(false)
  }

  function handleIconPress() {
    props.onFocus?.()
    setShowTimePicker(true)
  }

  function handleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setTime(event.nativeEvent.text)
    props.onChange?.()
  }

  return (
    <View style={props.style}>
      <MyInput
        label={props.label}
        placeholder={props.placeholder}
        value={time}
        rightIcon={<IonIcons name='time-outline' size={25} color={themeContext.neutral} onPress={handleIconPress} />}
        showError={props.showError}
        onFocus={props.onFocus}
        onChange={handleChange}
      />
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode='time'
        date={getTime()}
        onConfirm={handleConfirm}
        onCancel={() => setShowTimePicker(false)}
        display='spinner'
      />
    </View>
  )
})

export default TimeInput
export { TimeInputRefType }
