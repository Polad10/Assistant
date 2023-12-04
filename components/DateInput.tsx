import { TouchableOpacity, View } from 'react-native'
import MyInput from './MyInput'
import { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { DateTime } from 'luxon'
import IonIcons from '@expo/vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'

type Props = {
  label?: string
  placeholder?: string
  date?: Date
  onChange?: (dateTime: Date) => void
  showError?: boolean
}

export default function DateInput(props: Props) {
  const { colors } = useTheme()

  const [date, setDate] = useState<Date | undefined>(props.date)
  const [showDatePicker, setShowDatePicker] = useState(false)

  function handleConfirm(date: Date) {
    setDate(date)
    props.onChange?.(date)

    setShowDatePicker(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <MyInput
          pointerEvents='none'
          label={props.label}
          placeholder={props.placeholder}
          value={date ? DateTime.fromJSDate(date).toISODate() ?? undefined : undefined}
          rightIcon={<IonIcons name='calendar-outline' size={25} color={colors.notification} />}
          showError={props.showError}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode='date'
        date={date}
        onConfirm={handleConfirm}
        onCancel={() => setShowDatePicker(false)}
        display='inline'
      />
    </View>
  )
}