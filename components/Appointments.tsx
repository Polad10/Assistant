import { StyleSheet, View, Text } from 'react-native'
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
    context!.fetchTreatments()
    context!.fetchPatients()
  }, [])

  const renderItem = (item: Appointment) => {
    return <AgendaItem appointment={item} />
  }

  const renderEmptyData = () => {
    return (
      <View style={styles(colors).emptyDateView}>
        <Text style={[styles(colors).defaultText, styles(colors).emptyDateText]}>No events found</Text>
      </View>
    )
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

  for (const [date, appointments] of groupedAppointments) {
    appointments.sort((a1, a2) => {
      return a1.datetime.localeCompare(a2.datetime)
    })
  }

  const agendaItems = Object.fromEntries(groupedAppointments)

  return (
    <MainView>
      <Agenda
        items={agendaItems}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
        showOnlySelectedDayItems={true}
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
    defaultText: {
      color: colors.text,
    },
    emptyDateView: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100,
    },
    emptyDateText: {
      fontSize: 40,
    },
  })
