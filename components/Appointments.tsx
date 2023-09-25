import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Agenda } from 'react-native-calendars'
import { useContext, useEffect } from 'react'
import AgendaItem from './AgendaItem'
import { Colors } from '../types/Colors'
import MyFAB from './MyFAB'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { DataContext } from '../contexts/DataContext'
import { DateTime } from 'luxon'

export default function Appointments({ navigation }: RootStackScreenProps<'Appointments'>) {
  const { colors } = useTheme()
  const context = useContext(DataContext)

  useEffect(() => {
    context!.fetchAppointments()
  }, [])

  const renderItem = (item: Appointment) => {
    return <AgendaItem appointment={item} />
  }

  const groupedAppointments = new Map<string, Appointment[]>()

  for (const appointment of context?.appointments ?? []) {
    const date = DateTime.fromISO(appointment.datetime).toISODate()

    if (!date) {
      return
    }

    if (!groupedAppointments.has(date)) {
      groupedAppointments.set(date, [])
    }

    groupedAppointments.get(date)?.push(appointment)
  }

  const agendaItems = Object.fromEntries(groupedAppointments)

  return (
    <MainView>
      {/* <CalendarProvider
        showTodayButton={true}
        date={new Date().toDateString()}
        theme={{ todayButtonTextColor: colors.text }}
        todayButtonStyle={styles(colors).todayButton}
        onDateChanged={handleDateChanged}
      >
        <ExpandableCalendar
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            arrowColor: colors.primary,
            monthTextColor: colors.text,
            textSectionTitleColor: colors.text,
            todayTextColor: colors.primary,
            selectedDayBackgroundColor: colors.primary,
          }}
          style={{ backgroundColor: 'black' }}
          date={new Date().toDateString()}
        />
        <AgendaList sections={items} renderItem={renderItem} sectionStyle={styles(colors).agendaSection} />
      </CalendarProvider> */}
      <Agenda
        items={agendaItems}
        renderItem={renderItem}
        theme={{
          calendarBackground: colors.background,
          monthTextColor: colors.text,
          todayTextColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          reservationsBackgroundColor: colors.background,
          agendaDayNumColor: colors.text,
          agendaDayTextColor: colors.text,
          agendaTodayColor: colors.primary,
        }}
      />
      <MyFAB onPress={() => navigation.navigate('NewAppointment')} />
    </MainView>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    agendaSection: {
      backgroundColor: colors.card,
      color: colors.text,
    },
    todayButton: {
      backgroundColor: colors.primary,
    },
  })
