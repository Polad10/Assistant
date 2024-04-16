import { NativeSyntheticEvent, StyleProp, TextInputChangeEventData, View, ViewStyle } from 'react-native'
import MyInput from './MyInput'
import { forwardRef, useContext, useImperativeHandle, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { DateTime } from 'luxon'
import IonIcons from '@expo/vector-icons/Ionicons'
import { ThemeContext } from '../contexts/ThemeContext'

type Props = {
  label?: string
  placeholder?: string
  date?: Date
  showError?: boolean
  style?: StyleProp<ViewStyle>
  onFocus?: () => void
  onChange?: () => void
}

type DateInputRefType = {
  getDate: () => Date | undefined
}

const DateInput = forwardRef((props: Props, ref) => {
  const themeContext = useContext(ThemeContext)!

  let initialDate = props.date ? DateTime.fromJSDate(props.date).toISODate() : undefined
  initialDate ??= undefined

  const [date, setDate] = useState(initialDate)
  const [showDatePicker, setShowDatePicker] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      getDate,
    }
  })

  function getDate() {
    const dateVal = date ?? ''
    const dateObj = DateTime.fromISO(dateVal)

    return dateObj.isValid ? dateObj.toJSDate() : undefined
  }

  function handleConfirm(date: Date) {
    setDate(DateTime.fromJSDate(date).toISODate() ?? undefined)
    props.onChange?.()

    setShowDatePicker(false)
  }

  function handleIconPress() {
    props.onFocus?.()
    setShowDatePicker(true)
  }

  function handleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setDate(event.nativeEvent.text)
    props.onChange?.()
  }

  return (
    <View style={props.style}>
      <MyInput
        label={props.label}
        placeholder={props.placeholder}
        value={date}
        rightIcon={
          <IonIcons name='calendar-clear-outline' size={25} color={themeContext.neutral} onPress={handleIconPress} />
        }
        showError={props.showError}
        onFocus={props.onFocus}
        onChange={handleChange}
      />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode='date'
        date={getDate()}
        onConfirm={handleConfirm}
        onCancel={() => setShowDatePicker(false)}
        display='inline'
      />
    </View>
  )
})

export default DateInput
export { DateInputRefType }
