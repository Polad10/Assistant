import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../types/Colors'
import { useTheme } from '@react-navigation/native'
import MyInput from './MyInput'
import { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { DateTime } from 'luxon'
import IonIcons from '@expo/vector-icons/Ionicons'
import MainView from './MainView'

type Props = {
  datetime?: Date
  dateLabel?: string
  timeLabel?: string
  datePlaceholder?: string
  timePlaceholder?: string
  showDatePicker?: boolean
  showTimePicker?: boolean
  showDatePickerError?: boolean
  showTimePickerError?: boolean
  onDateChange?: (dateTime: Date) => void
  onTimeChange?: (dateTime: Date) => void
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
    if (mode === 'date') {
      setDate(dateTime)
      props.onDateChange?.(dateTime)
    } else {
      setTime(dateTime)
      props.onTimeChange?.(dateTime)
    }

    setShowDateTimePicker(false)
  }

  return (
    <MainView>
      <View style={styles(styleProps).dateTimeContainer}>
        <TouchableOpacity style={styles(styleProps).datePicker} onPress={() => showMode('date')}>
          <MyInput
            pointerEvents='none'
            label={props.dateLabel}
            placeholder={props.datePlaceholder}
            value={date ? DateTime.fromJSDate(date).toISODate() ?? undefined : undefined}
            rightIcon={<IonIcons name='calendar-outline' size={25} color={colors.notification} />}
            showError={props.showDatePickerError}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles(styleProps).timePicker} onPress={() => showMode('time')}>
          <MyInput
            pointerEvents='none'
            label={props.timeLabel}
            placeholder={props.timePlaceholder}
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
    </MainView>
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
