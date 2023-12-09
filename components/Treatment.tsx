import { useNavigation, useTheme } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import DetailTab from './DetailTab'
import { View, StyleSheet, Text } from 'react-native'
import MyFAB from './MyFAB'
import PaymentList from './PaymentList'
import { Colors } from '../types/Colors'
import { DataContext } from '../contexts/DataContext'
import { getPatientFullName } from '../helpers/PatientHelper'
import { DateTime } from 'luxon'
import { getGroupedAppointments } from '../helpers/AppointmentHelper'
import { Status } from '../enums/Status'
import MainView from './MainView'
import MyAgendaList from './MyAgendaList'
import HeaderButton from './HeaderButton'
import CustomIcon from './CustomIcon'
import { treatmentFinished } from '../helpers/TreatmentHelper'
import MyButtonGroup from './MyButtonGroup'

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

  function handleEdit() {
    navigation.navigate('EditTreatment', { treatmentId: treatmentId })
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title='Edit' onPress={handleEdit} />,
    })

    context.fetchTreatments()
    context.fetchPatients()
    context.fetchAppointments()
    context.fetchPayments()
  }, [])

  const treatment = context.treatments?.find((t) => t.id === treatmentId)

  if (!treatment) {
    return
  }

  const patient = context.patients?.find((p) => p.id === treatment?.patient_id)
  const appointments = context.appointments?.filter((a) => a.treatment_id === treatment?.id) ?? []
  const payments = context.payments?.filter((p) => p.treatment_id === treatment?.id) ?? []

  const totalPayments = payments.reduce((sum, payment) => Number(sum) + Number(payment.amount), 0)

  const groupedAppointments = getGroupedAppointments(appointments)

  const agendaItems = groupedAppointments
    ? Array.from(groupedAppointments).map(([date, appointments]) => {
        return {
          title: date,
          data: appointments,
        }
      })
    : []

  const styleProps: StyleProps = {
    colors: colors,
    treatmentFinished: treatmentFinished(treatment),
  }

  const buttons = [
    {
      element: () => <DetailTab name='calendar' type='feather' index={0} selectedIndex={selectedIndex} />,
    },
    {
      element: () => <DetailTab name='cash-outline' type='ionicon' index={1} selectedIndex={selectedIndex} />,
    },
  ]

  const TabContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <MainView>
            <MyAgendaList sections={agendaItems} pageName='Treatment' />
            <MyFAB onPress={() => navigation.navigate('NewAppointment', { treatment: treatment })} />
          </MainView>
        )
      case 1:
        return (
          <MainView>
            <PaymentList pageName='Patient' payments={payments} />
            <MyFAB onPress={() => navigation.navigate('NewPayment', { treatmentId: treatment.id })} />
          </MainView>
        )
      default:
        return null
    }
  }

  const status = styleProps.treatmentFinished ? Status.FINISHED : Status.ONGOING

  return (
    <MainView>
      <View style={[styles(styleProps).headerView, styles(styleProps).card]}>
        <Text style={styles(styleProps).title}>{treatment.title}</Text>
      </View>
      <View style={[styles(styleProps).infoView, styles(styleProps).card]}>
        <View style={styles(styleProps).statusView}>
          <Text style={styles(styleProps).text}>Status: </Text>
          <Text style={[styles(styleProps).text, styles(styleProps).status]}>{status}</Text>
        </View>
        <Text style={styles(styleProps).text}>Patient: {getPatientFullName(patient)}</Text>
        <Text style={styles(styleProps).text}>Start date: {DateTime.fromISO(treatment.start_date).toISODate()}</Text>
        <Text style={styles(styleProps).text}>
          End date: {treatment.end_date ? DateTime.fromISO(treatment.end_date).toISODate() : '-'}
        </Text>
        <View style={styles(styleProps).priceView}>
          <Text style={styles(styleProps).text}>Total price: {treatment.price} </Text>
          <CustomIcon name='manat' color={colors.text} size={15} style={{ paddingTop: 5 }} />
        </View>
        <View style={styles(styleProps).priceView}>
          <Text style={styles(styleProps).text}>Paid: {totalPayments} </Text>
          <CustomIcon name='manat' color={colors.text} size={15} style={{ paddingTop: 5 }} />
        </View>
      </View>
      <View style={styles(styleProps).additionalInfoView}>
        <MyButtonGroup buttons={buttons} selectedIndex={selectedIndex} onPress={(value) => setSelectedIndex(value)} />
        <TabContent />
      </View>
    </MainView>
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    headerView: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    additionalInfoView: {
      flex: 1,
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
    statusView: {
      flexDirection: 'row',
    },
    status: {
      color: styleProps.treatmentFinished ? 'lightgreen' : 'orange',
    },
    priceView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
