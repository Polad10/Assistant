import { View, StyleSheet } from 'react-native'
import { Agenda, DateData } from 'react-native-calendars'
import { useContext, useEffect, useState } from 'react'
import AgendaItem from './AgendaItem'
import MyFAB from './MyFAB'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { DataContext } from '../contexts/DataContext'
import { getGroupedAppointments } from '../helpers/AppointmentHelper'
import { Appointment } from '../modals/Appointment'
import NoAppointments from './user-messages/NoAppointments'
import { ThemeContext } from '../contexts/ThemeContext'
import { Divider } from '@rneui/themed'
import { configureCalendar } from '../helpers/CalendarConfig'
import { DateTime } from 'luxon'
import LoadingView from './LoadingView'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { useNavigation } from '@react-navigation/native'

export default function Appointments() {
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()

  const dataContext = useContext(DataContext)!
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!

  const [agendaKey, setAgendaKey] = useState(Math.random())
  const [agendaItems, setAgendaItems] = useState({})
  const [dayIsEmpty, setDayIsEmpty] = useState(false)

  useEffect(() => {
    configureCalendar(localizationContext.language)
  }, [localizationContext.language])

  useEffect(() => {
    const groupedAppointments = dataContext.appointments ? getGroupedAppointments(dataContext.appointments) : null
    setAgendaItems(groupedAppointments ? Object.fromEntries(groupedAppointments) : {})

    setAgendaKey(Math.random)
  }, [dataContext.appointments])

  useEffect(() => {
    checkIfDayIsEmpty(DateTime.local().toISODate()!)
  }, [agendaItems])

  const renderItem = (item: Appointment) => {
    return (
      <View>
        <AgendaItem appointment={item} />
        <Divider color={themeContext.border} style={styles.divider} />
      </View>
    )
  }

  const renderEmptyData = () => {
    return dataContext.loading ? (
      <LoadingView />
    ) : (
      <NoAppointments addBtnOnPress={() => navigation.navigate('NewAppointment')} />
    )
  }

  function handleDayChange(dateData: DateData) {
    checkIfDayIsEmpty(dateData.dateString)
  }

  function checkIfDayIsEmpty(date: string) {
    if (agendaItems.hasOwnProperty(date)) {
      setDayIsEmpty(false)
    } else {
      setDayIsEmpty(true)
    }
  }

  function getContent() {
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
      </MainView>
    )
  }

  return getContent()
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 10,
  },
})
