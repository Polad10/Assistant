import { View, Text, StyleSheet } from 'react-native'
import { RootStackScreenProps } from '../types/Navigation'
import { Colors } from '../types/Colors'
import { useTheme } from '@react-navigation/native'
import { ButtonGroup } from '@rneui/themed'
import { useContext, useEffect, useState } from 'react'
import TreatmentList from './TreatmentList'
import DetailTab from './DetailTab'
import PaymentList from './PaymentList'
import { DataContext } from '../contexts/DataContext'
import { getPatientFullName } from '../helpers/PatientHelper'
import { getGroupedAppointments } from '../helpers/AppointmentHelper'
import { DateTime } from 'luxon'
import MyAgendaList from './MyAgendaList'
import MainView from './MainView'

export default function Patient({ route }: RootStackScreenProps<'Patient'>) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { colors } = useTheme()
  const { patientId } = route.params

  const context = useContext(DataContext)

  if (!context) {
    return
  }

  useEffect(() => {
    context.fetchAppointments()
    context.fetchTreatments()
    context.fetchPayments()
  }, [])

  const today = DateTime.local().toISODate()

  const patient = context.patients?.find((p) => p.id === patientId)
  const treatments = context.treatments?.filter((t) => t.patient_id === patient?.id && !t.finished)
  const payments = context.payments?.filter((p) => treatments?.some((t) => t.id === p.treatment_id)) ?? []

  const appointments = context.appointments?.filter((a) => {
    const datetime = DateTime.fromISO(a.datetime).toISODate()

    if (!datetime || !today) {
      return false
    }

    return treatments?.some((t) => t.id === a.treatment_id) && datetime >= today
  })

  const groupedAppointments = appointments ? getGroupedAppointments(appointments) : null
  const agendaItems = groupedAppointments
    ? Array.from(groupedAppointments).map(([date, appointments]) => {
        return {
          title: date,
          data: appointments,
        }
      })
    : []

  const buttons = [
    {
      element: () => <DetailTab iconName='calendar' index={0} selectedIndex={selectedIndex} />,
    },
    {
      element: () => <DetailTab iconName='tooth' index={1} selectedIndex={selectedIndex} />,
    },
    {
      element: () => <DetailTab iconName='money-bill-alt' index={2} selectedIndex={selectedIndex} />,
    },
  ]

  const TabContent = () => {
    switch (selectedIndex) {
      case 0:
        return <MyAgendaList sections={agendaItems} pageName='Patient' />
      case 1:
        return <TreatmentList pageName='Patient' patient={patient} />
      case 2:
        return <PaymentList pageName='Patient' payments={payments} />
      default:
        return null
    }
  }

  return (
    <MainView>
      <View style={[styles(colors).headerView, styles(colors).card]}>
        <Text style={styles(colors).title}>{getPatientFullName(patient)}</Text>
      </View>
      <View style={[styles(colors).infoView, styles(colors).card]}>
        <Text style={styles(colors).text}>City: {patient?.city}</Text>
        <Text style={styles(colors).text}>Phone number: {patient?.phone}</Text>
        <Text style={styles(colors).text}>Extra info: {patient?.extra_info}</Text>
      </View>
      <View style={[styles(colors).additionalInfoView, styles(colors).card]}>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={(value) => setSelectedIndex(value)}
          selectedButtonStyle={{ backgroundColor: colors.primary }}
        />
        <TabContent />
      </View>
    </MainView>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    headerView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      flex: 1,
      paddingLeft: 5,
    },
    additionalInfoView: {
      flex: 3,
    },
    title: {
      color: colors.text,
      fontSize: 25,
    },
    text: {
      color: colors.text,
      fontSize: 18,
      marginTop: 5,
    },
    card: {
      backgroundColor: colors.card,
      marginTop: 5,
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
