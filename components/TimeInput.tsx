import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'
import MyInput from './MyInput'
import { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { DateTime } from 'luxon'
import IonIcons from '@expo/vector-icons/Ionicons'

type Props = {
  label?: string
  placeholder?: string
  time?: Date
  onChange?: (dateTime: Date) => void
  showError?: boolean
  style?: StyleProp<ViewStyle>
}

type Mode = 'date' | 'time'

export default function TimeInput(props: Props) {
  const { colors } = useTheme()

  const [time, setTime] = useState(props.time)
  const [showTimePicker, setShowTimePicker] = useState(false)

  function handleConfirm(dateTime: Date) {
    setTime(dateTime)
    props.onChange?.(dateTime)

    setShowTimePicker(false)
  }

  return (
    <View style={props.style}>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <MyInput
          pointerEvents='none'
          label={props.label}
          placeholder={props.placeholder}
          value={time ? DateTime.fromJSDate(time).toLocaleString(DateTime.TIME_24_SIMPLE) ?? undefined : undefined}
          rightIcon={<IonIcons name='time-outline' size={25} color={colors.notification} />}
          showError={props.showError}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode='time'
        date={time ?? new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setShowTimePicker(false)}
        display='spinner'
      />
    </View>
  )
}
