import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Agenda } from 'react-native-calendars'
import { useEffect, useState } from 'react'
import AgendaItem from './AgendaItem'
import { Colors } from '../types/Colors'
import MyFAB from './MyFAB'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import axios from 'axios'

export default function Appointments({ navigation }: RootStackScreenProps<'Appointments'>) {
  const { colors } = useTheme()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  async function getPatients() {
    const appointments = (await axios.get<Appointment[]>('http://192.168.1.236:3000/appointments')).data

    setAppointments(appointments)
  }

  useEffect(() => {
    getPatients()
  }, [])

  const renderItem = (item: any) => {
    return <AgendaItem item={item} />
  }

  const items = {
    '2023-09-25': [
      {
        id: 1,
        datetime: new Date(),
        actions: 'actions',
        treatment_id: 2,
      },
    ],
  }

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
        items={items}
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
