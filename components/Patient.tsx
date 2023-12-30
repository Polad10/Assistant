import { View, Text, StyleSheet } from 'react-native'
import { RootStackScreenProps } from '../types/Navigation'
import { Colors } from '../types/Colors'
import { useTheme } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import TreatmentList from './TreatmentList'
import PaymentList from './PaymentList'
import { DataContext } from '../contexts/DataContext'
import { getPatientFullName } from '../helpers/PatientHelper'
import {
  getAgendaItems,
  getAppointmentsForTreatments,
  getGroupedAppointments,
  getOngoingAppointments,
} from '../helpers/AppointmentHelper'
import MyAgendaList from './MyAgendaList'
import MainView from './MainView'
import HeaderButton from './HeaderButton'
import { getOngoingTreatments, getPatientTreatments } from '../helpers/TreatmentHelper'
import IonIcons from '@expo/vector-icons/Ionicons'
import DetailTab from './DetailTab'
import MyButtonGroup from './MyButtonGroup'
import { getPaymentsForTreatments } from '../helpers/PaymentHelper'
import MyFAB from './MyFAB'
import NoAppointments from './no-data/NoAppointments'

export default function Patient({ navigation, route }: RootStackScreenProps<'Patient'>) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { colors } = useTheme()
  const { patientId } = route.params

  const context = useContext(DataContext)

  if (!context) {
    return
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title='Edit' onPress={handleEdit} />,
    })

    context.fetchAppointments()
    context.fetchTreatments()
    context.fetchPayments()
  }, [])

  const patient = context.patients?.find((p) => p.id === patientId)

  if (!patient) {
    return
  }

  const treatments = getPatientTreatments(context.treatments ?? [], patient.id)
  const ongoingTreatments = getOngoingTreatments(treatments)
  const payments = getPaymentsForTreatments(context.payments ?? [], treatments)

  const appointments = getAppointmentsForTreatments(context.appointments ?? [], ongoingTreatments)
  const ongoingAppointments = getOngoingAppointments(appointments)

  const groupedAppointments = getGroupedAppointments(ongoingAppointments) ?? new Map()
  const agendaItems = getAgendaItems(groupedAppointments)

  const buttons = [
    {
      element: () => <DetailTab name='calendar' type='feather' index={0} selectedIndex={selectedIndex} />,
    },
    {
      element: () => (
        <DetailTab name='tooth-outline' type='material-community' index={1} selectedIndex={selectedIndex} />
      ),
    },
    {
      element: () => <DetailTab name='cash-outline' type='ionicon' index={2} selectedIndex={selectedIndex} />,
    },
  ]

  const TabContent = () => {
    switch (selectedIndex) {
      case 0:
        if (agendaItems.length > 0) {
          return (
            <MainView>
              <MyAgendaList sections={agendaItems} pageName='Patient' />
              <MyFAB onPress={() => navigation.navigate('NewAppointment', { patient: patient })} />
            </MainView>
          )
        } else {
          return (
            <NoAppointments
              pageName='Patient'
              addBtnOnPress={() => navigation.navigate('NewAppointment', { patient: patient })}
            />
          )
        }
      case 1:
        return (
          <MainView>
            <TreatmentList pageName='Patient' patient={patient} />
            <MyFAB onPress={() => navigation.navigate('NewTreatment', { patient: patient })} />
          </MainView>
        )
      case 2:
        return <PaymentList pageName='Patient' payments={payments} />
      default:
        return null
    }
  }

  function handleEdit() {
    navigation.navigate('EditPatient', { patientId: patientId })
  }

  return (
    <MainView>
      <View style={[styles(colors).headerView, styles(colors).card]}>
        <Text style={styles(colors).title}>{getPatientFullName(patient)}</Text>
      </View>
      <View style={styles(colors).card}>
        <View style={styles(colors).infoField}>
          <IonIcons name='home-outline' size={22} style={styles(colors).infoIcon} />
          <Text style={styles(colors).text}>{patient.city || '-'}</Text>
        </View>
        <View style={styles(colors).infoField}>
          <IonIcons name='call-outline' size={22} style={styles(colors).infoIcon} />
          <Text style={styles(colors).text}>{patient.phone || '-'}</Text>
        </View>
        <View style={styles(colors).infoField}>
          <IonIcons name='information-circle-outline' size={22} style={styles(colors).infoIcon} />
          <Text style={styles(colors).text}>{patient.extra_info || '-'}</Text>
        </View>
      </View>
      <View style={styles(colors).additionalInfoView}>
        <MyButtonGroup buttons={buttons} selectedIndex={selectedIndex} onPress={(value) => setSelectedIndex(value)} />
        <TabContent />
      </View>
    </MainView>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    headerView: {
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoField: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    infoIcon: {
      color: colors.text,
      opacity: 0.5,
      marginRight: 10,
    },
    additionalInfoView: {
      flex: 1,
    },
    title: {
      color: colors.text,
      fontSize: 25,
    },
    text: {
      color: colors.text,
      fontSize: 20,
    },
    card: {
      backgroundColor: colors.card,
      padding: 20,
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
