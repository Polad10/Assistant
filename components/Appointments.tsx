import { StyleSheet, View, Text } from 'react-native'
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
import EmptyAgendaIllustration from './EmptyAgendaIllustration'
import { Button } from '@rneui/themed'

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
    return (
      <NoDataFound
        illustration={<EmptyAgendaIllustration />}
        title='No Appointments'
        subtitle="To plan your day, click the '+' button to add a new appointment."
        addBtnTitle='Add Appointment'
        addBtnOnPress={() => navigation.navigate('NewAppointment')}
      />
    )
  }

  return (
    <MainView>
      <Agenda
        key={Math.random()} // Workaround for Agenda's bug, where the item list not updated correctly
        items={agendaItems}
        renderItem={renderItem}
        renderDay={() => <View></View>}
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
      {Object.keys(agendaItems).length > 0 && <MyFAB onPress={() => navigation.navigate('NewAppointment')} />}
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
