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
import { getGroupedAppointments } from '../helpers/AppointmentHelper'
import { Appointment } from '@polad10/assistant-models/Appointment'
import NoDataFound from './NoDataView'

export default function Appointments({ navigation }: RootStackScreenProps<'Appointments'>) {
  const { colors } = useTheme()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  useEffect(() => {
    context.fetchAppointments()
    context.fetchTreatments()
    context.fetchPatients()
  }, [])

  const renderItem = (item: Appointment) => {
    return <AgendaItem appointment={item} />
  }

  const renderEmptyData = () => {
    return <NoDataFound text='No appointments found' />
  }

  const groupedAppointments = context.appointments ? getGroupedAppointments(context.appointments) : null
  const agendaItems = groupedAppointments ? Object.fromEntries(groupedAppointments) : {}

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
