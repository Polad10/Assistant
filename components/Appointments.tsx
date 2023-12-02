import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Agenda } from 'react-native-calendars'
import { useContext, useEffect, useState } from 'react'
import AgendaItem from './AgendaItem'
import { Colors } from '../types/Colors'
import MyFAB from './MyFAB'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { DataContext } from '../contexts/DataContext'
import { getGroupedAppointments } from '../helpers/AppointmentHelper'
import { Appointment } from '../modals/Appointment'
import NoDataFound from './NoDataView'
import { DateTime } from 'luxon'

export default function Appointments({ navigation }: RootStackScreenProps<'Appointments'>) {
  const { colors } = useTheme()
  const context = useContext(DataContext)
  const [agendaItems, setAgendaItems] = useState({})

  if (!context) {
    return
  }

  useEffect(() => {
    context.fetchAppointments()
    context.fetchTreatments()
    context.fetchPatients()
  }, [])

  useEffect(() => {
    const groupedAppointments = context.appointments ? getGroupedAppointments(context.appointments) : null
    setAgendaItems(groupedAppointments ? Object.fromEntries(groupedAppointments) : {})
  }, [context.appointments])

  const renderItem = (item: Appointment) => {
    return <AgendaItem appointment={item} />
  }

  const renderEmptyData = () => {
    return <NoDataFound text='No appointments found' />
  }

  return (
    <MainView>
      <Agenda
        key={Math.random()} // Workaround for Agenda's bug, where the item list not updated correctly
        items={agendaItems}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
        showOnlySelectedDayItems={true}
        selected={DateTime.local().toISO() ?? undefined}
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
