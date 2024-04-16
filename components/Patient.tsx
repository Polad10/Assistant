import { View, Text, StyleSheet } from 'react-native'
import { RootStackScreenProps } from '../types/Navigation'
import { useContext, useEffect, useState } from 'react'
import TreatmentList from './TreatmentList'
import PaymentList from './PaymentList'
import { DataContext } from '../contexts/DataContext'
import { getPatientFullName } from '../helpers/PatientHelper'
import { getAgendaItems, getAppointmentsForTreatments, getGroupedAppointments } from '../helpers/AppointmentHelper'
import MyAgendaList from './MyAgendaList'
import MainView from './MainView'
import HeaderButton from './HeaderButton'
import { getOngoingTreatments, getPatientTreatments } from '../helpers/TreatmentHelper'
import IonIcons from '@expo/vector-icons/Ionicons'
import DetailTab from './DetailTab'
import MyButtonGroup from './MyButtonGroup'
import { getPaymentsForTreatments } from '../helpers/PaymentHelper'
import MyFAB from './MyFAB'
import NoAppointments from './user-messages/NoAppointments'
import NoTreatments from './user-messages/NoTreatments'
import NoPayments from './user-messages/NoPayments'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { DateTime } from 'luxon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function Patient() {
  const navigation = useNavigation<RootStackScreenProps<'Patient'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'Patient'>['route']>()

  const dataContext = useContext(DataContext)!
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  const [selectedIndex, setSelectedIndex] = useState(0)
  const { patientId } = route.params

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title={translator.translate('edit')} onPress={handleEdit} />,
    })
  }, [])

  const patient = dataContext.patients?.find((p) => p.id === patientId)

  if (!patient) {
    return
  }

  const treatments = getPatientTreatments(dataContext.treatments ?? [], patient.id)
  const ongoingTreatments = getOngoingTreatments(treatments)
  const payments = getPaymentsForTreatments(dataContext.payments ?? [], treatments)

  const appointments = getAppointmentsForTreatments(dataContext.appointments ?? [], ongoingTreatments)

  const groupedAppointments = getGroupedAppointments(appointments, true) ?? new Map()
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
          return <NoAppointments addBtnOnPress={() => navigation.navigate('NewAppointment', { patient: patient })} />
        }
      case 1:
        if (treatments.length > 0) {
          return (
            <MainView>
              <TreatmentList pageName='Patient' treatments={treatments} />
              <MyFAB onPress={() => navigation.navigate('NewTreatment', { patient: patient })} />
            </MainView>
          )
        } else {
          return <NoTreatments addBtnOnPress={() => navigation.navigate('NewTreatment', { patient: patient })} />
        }
      case 2:
        if (payments.length > 0) {
          return (
            <MainView>
              <PaymentList pageName='Patient' payments={payments} />
              <MyFAB onPress={() => navigation.navigate('NewPayment', { patient: patient })} />
            </MainView>
          )
        } else {
          return <NoPayments addBtnOnPress={() => navigation.navigate('NewPayment', { patient: patient })} />
        }
      default:
        return null
    }
  }

  function handleEdit() {
    navigation.navigate('EditPatient', { patientId: patientId })
  }

  return (
    <MainView>
      <View style={[styles(themeContext).headerView, styles(themeContext).card]}>
        <Text style={styles(themeContext).title}>{getPatientFullName(patient)}</Text>
      </View>
      <View style={styles(themeContext).card}>
        <View style={styles(themeContext).infoField}>
          <IonIcons name='home-outline' size={22} style={styles(themeContext).infoIcon} />
          <Text style={styles(themeContext).text}>{patient.city || '-'}</Text>
        </View>
        <View style={styles(themeContext).infoField}>
          <MaterialCommunityIcons name='cake-variant-outline' size={22} style={styles(themeContext).infoIcon} />
          <Text style={styles(themeContext).text}>
            {patient.dob
              ? DateTime.fromISO(patient.dob).setLocale(localizationContext.language).toFormat('MMMM d, yyyy')
              : '-'}
          </Text>
        </View>
        <View style={styles(themeContext).infoField}>
          <IonIcons name='call-outline' size={22} style={styles(themeContext).infoIcon} />
          <Text style={styles(themeContext).text}>{patient.phone || '-'}</Text>
        </View>
        <View style={styles(themeContext).infoField}>
          <IonIcons name='information-circle-outline' size={22} style={styles(themeContext).infoIcon} />
          <Text style={styles(themeContext).text}>{patient.extra_info || '-'}</Text>
        </View>
      </View>
      <MyButtonGroup buttons={buttons} selectedIndex={selectedIndex} onPress={(value) => setSelectedIndex(value)} />
      <View style={styles(themeContext).additionalInfoView}>
        <TabContent />
      </View>
    </MainView>
  )
}

const styles = (themeContext: ThemeContextType) =>
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
      color: themeContext.neutral,
      opacity: 0.5,
      marginRight: 10,
    },
    additionalInfoView: {
      flex: 1,
    },
    title: {
      color: themeContext.neutral,
      fontSize: 25,
    },
    text: {
      color: themeContext.neutral,
      fontSize: 20,
    },
    card: {
      backgroundColor: themeContext.secondary,
      padding: 20,
      marginTop: 5,
    },
    defaultText: {
      color: themeContext.neutral,
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
