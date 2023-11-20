import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Colors } from '../types/Colors'
import { useTheme } from '@react-navigation/native'
import MyInput from './MyInput'
import { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { DateTime } from 'luxon'
import IonIcons from '@expo/vector-icons/Ionicons'

type Props = {
  text: string
  datetime?: Date
  showDatePicker?: boolean
  showTimePicker?: boolean
  showDatePickerError?: boolean
  showTimePickerError?: boolean
  onChange?: (dateTime: Date) => void
}

type StyleProps = {
  colors: Colors
  showDatePicker?: boolean
  showTimePicker?: boolean
}

type Mode = 'date' | 'time'

export default function DateTimeInput(props: Props) {
  const { colors } = useTheme()
  const [mode, setMode] = useState<Mode>('date')
  const [date, setDate] = useState<Date | undefined>(props.datetime)
  const [time, setTime] = useState<Date | undefined>(props.datetime)
  const [showDateTimePicker, setShowDateTimePicker] = useState(false)

  const styleProps: StyleProps = {
    colors: colors,
    showDatePicker: props.showDatePicker,
    showTimePicker: props.showTimePicker,
  }

  function showMode(mode: Mode) {
    setMode(mode)
    setShowDateTimePicker(true)
  }

  function handleConfirm(dateTime: Date) {
    mode === 'date' ? setDate(dateTime) : setTime(dateTime)
    setShowDateTimePicker(false)
    props.onChange?.(dateTime)
  }

  return (
    <View>
      <View style={styles(styleProps).dateTimeContainer}>
        <TouchableOpacity style={styles(styleProps).datePicker} onPress={() => showMode('date')}>
          <MyInput
            pointerEvents='none'
            placeholder='Date'
            value={date ? DateTime.fromJSDate(date).toISODate() ?? undefined : undefined}
            rightIcon={<IonIcons name='calendar-outline' size={25} color={colors.notification} />}
            showError={props.showDatePickerError}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles(styleProps).timePicker} onPress={() => showMode('time')}>
          <MyInput
            pointerEvents='none'
            placeholder='Time'
            value={time ? DateTime.fromJSDate(time).toLocaleString(DateTime.TIME_24_SIMPLE) ?? undefined : undefined}
            containerStyle={styles(styleProps).datePicker}
            rightIcon={<IonIcons name='time-outline' size={25} color={colors.notification} />}
            showError={props.showTimePickerError}
          />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={showDateTimePicker}
        mode={mode}
        date={mode === 'date' ? date : time}
        onConfirm={handleConfirm}
        onCancel={() => setShowDateTimePicker(false)}
        display={mode === 'date' ? 'inline' : 'spinner'}
      />
    </View>
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    dateTimeContainer: {
      flexDirection: 'row',
    },
    datePicker: {
      flex: 1,
      display: styleProps.showDatePicker ? 'flex' : 'none',
    },
    timePicker: {
      flex: 1,
      display: styleProps.showTimePicker ? 'flex' : 'none',
    },
  })
