import { View, StyleSheet } from 'react-native'
import { Agenda, DateData } from 'react-native-calendars'
import { useCallback, useContext, useEffect, useState } from 'react'
import AgendaItem from './AgendaItem'
import MyFAB from './MyFAB'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { DataContext } from '../contexts/DataContext'
import { getGroupedAppointments } from '../helpers/AppointmentHelper'
import { Appointment } from '../modals/Appointment'
import NoAppointments from './no-data/NoAppointments'
import LoadingView from './LoadingView'
import Error from './Error'
import { ThemeContext } from '../contexts/ThemeContext'
import { Divider } from '@rneui/themed'
import { configureCalendar } from '../helpers/CalendarConfig'

export default function Appointments({ navigation }: RootStackScreenProps<'Appointments'>) {
  const context = useContext(DataContext)!
  const themeContext = useContext(ThemeContext)!

  const [agendaKey, setAgendaKey] = useState(Math.random())
  const [agendaItems, setAgendaItems] = useState({})
  const [loading, setLoading] = useState(true)
  const [dayIsEmpty, setDayIsEmpty] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    configureCalendar()
    fetchData()
  }, [])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      await context.fetchTreatments()
      await context.fetchPatients()
      await context.fetchPayments()
      await context.fetchAppointments()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [context.appointments])

  async function retryAfterError() {
    setError(false)
    await fetchData()
  }

  useEffect(() => {
    const groupedAppointments = context.appointments ? getGroupedAppointments(context.appointments) : null
    setAgendaItems(groupedAppointments ? Object.fromEntries(groupedAppointments) : {})
    setAgendaKey(Math.random)
  }, [context.appointments])

  const renderItem = (item: Appointment) => {
    return (
      <View>
        <AgendaItem appointment={item} />
        <Divider color={themeContext.border} style={styles.divider} />
      </View>
    )
  }

  const renderEmptyData = () => {
    return loading ? <View></View> : <NoAppointments addBtnOnPress={() => navigation.navigate('NewAppointment')} />
  }

  function handleDayChange(dateData: DateData) {
    if (agendaItems.hasOwnProperty(dateData.dateString)) {
      setDayIsEmpty(false)
    } else {
      setDayIsEmpty(true)
    }
  }

  function getContent() {
    if (error) {
      return <Error onBtnPress={retryAfterError} />
    } else {
      return (
        <MainView>
          <Agenda
            key={agendaKey}
            items={agendaItems}
            renderItem={renderItem}
            renderDay={() => <View></View>}
            renderEmptyData={renderEmptyData}
            showOnlySelectedDayItems={true}
            onDayPress={handleDayChange}
            theme={{
              calendarBackground: themeContext.primary,
              monthTextColor: themeContext.neutral,
              todayTextColor: themeContext.accent,
              selectedDayBackgroundColor: themeContext.accent,
              reservationsBackgroundColor: themeContext.primary,
              agendaDayNumColor: themeContext.info,
              agendaDayTextColor: themeContext.info,
              agendaTodayColor: themeContext.primary,
              dotColor: themeContext.info,
            }}
          />
          {!dayIsEmpty && <MyFAB onPress={() => navigation.navigate('NewAppointment')} />}
          {loading && <LoadingView />}
        </MainView>
      )
    }
  }

  return getContent()
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 10,
  },
})
