import { useNavigation, useTheme } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useState } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import AgendaItem from './AgendaItem'
import DetailTab from './DetailTab'
import { View, StyleSheet, Text } from 'react-native'
import { AgendaList } from 'react-native-calendars'
import MyFAB from './MyFAB'
import PaymentList from './PaymentList'
import { Colors } from '../types/Colors'
import { ButtonGroup } from '@rneui/themed'
import { DataContext } from '../contexts/DataContext'
import { getPatientFullName } from '../helpers/PatientHelper'
import { DateTime } from 'luxon'
import { getGroupedAppointments } from '../helpers/AppointmentHelper'
import { Status } from '../enums/Status'

type StyleProps = {
  colors: Colors
  treatmentFinished: boolean | undefined
}

export default function Treatment({ route }: RootStackScreenProps<'Treatment'>) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { colors } = useTheme()
  const { treatmentId } = route.params

  const navigation = useNavigation<RootStackScreenProps<'Treatment'>['navigation']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  useEffect(() => {
    context.fetchTreatments()
    context.fetchPatients()
    context.fetchAppointments()
    context.fetchPayments()
  }, [])

  const treatment = context.treatments?.find((t) => t.id === treatmentId)
  const patient = context.patients?.find((p) => p.id === treatment?.patient_id)
  const appointments = context.appointments?.filter((a) => a.treatment_id === treatment?.id) ?? []
  const payments = context.payments?.filter((p) => p.treatment_id === treatment?.id) ?? []

  const groupedAppointments = getGroupedAppointments(appointments)

  const agendaItems = groupedAppointments
    ? Array.from(groupedAppointments).map(([date, appointments]) => {
        return {
          title: date,
          data: appointments,
        }
      })
    : []

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem appointment={item} />
  }, [])

  const styleProps: StyleProps = {
    colors: colors,
    treatmentFinished: treatment?.finished,
  }

  const buttons = [
    {
      element: () => <DetailTab iconName='calendar' index={0} selectedIndex={selectedIndex} />,
    },
    {
      element: () => <DetailTab iconName='money-bill-alt' index={1} selectedIndex={selectedIndex} />,
    },
  ]

  const TabContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <View style={styles(styleProps).mainView}>
            <AgendaList
              sections={agendaItems}
              renderItem={renderItem}
              sectionStyle={styles(styleProps).agendaSection}
            />
            <MyFAB onPress={() => navigation.navigate('NewAppointment', { treatment: treatment })} />
          </View>
        )
      case 1:
        return (
          <View style={styles(styleProps).mainView}>
            <PaymentList pageName='Patient' payments={payments} />
            <MyFAB onPress={() => navigation.navigate('NewPayment')} />
          </View>
        )
      default:
        return null
    }
  }

  const status = treatment?.finished ? Status.FINISHED : Status.ONGOING

  return (
    <View style={styles(styleProps).mainView}>
      <View style={[styles(styleProps).headerView, styles(styleProps).card]}>
        <Text style={styles(styleProps).title}>{treatment?.title}</Text>
      </View>
      <View style={[styles(styleProps).infoView, styles(styleProps).card]}>
        <View style={styles(styleProps).statusView}>
          <Text style={styles(styleProps).text}>Status: </Text>
          <Text style={[styles(styleProps).text, styles(styleProps).status]}>{status}</Text>
        </View>
        <Text style={styles(styleProps).text}>Patient: {getPatientFullName(patient)}</Text>
        <Text style={styles(styleProps).text}>
          Start date: {DateTime.fromISO(treatment?.start_date || '').toISODate()}
        </Text>
      </View>
      <View style={[styles(styleProps).additionalInfoView, styles(styleProps).card]}>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={(value) => setSelectedIndex(value)}
          selectedButtonStyle={{ backgroundColor: colors.primary }}
        />
        <TabContent />
      </View>
    </View>
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
    },
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
      color: styleProps.colors.text,
      fontSize: 25,
    },
    text: {
      color: styleProps.colors.text,
      fontSize: 18,
      marginTop: 5,
    },
    card: {
      backgroundColor: styleProps.colors.card,
      marginTop: 5,
    },
    agendaSection: {
      backgroundColor: styleProps.colors.card,
      color: styleProps.colors.text,
    },
    statusView: {
      flexDirection: 'row',
    },
    status: {
      color: styleProps.treatmentFinished ? 'lightgreen' : 'orange',
    },
  })
