import { View, Text, StyleSheet } from 'react-native'
import { RootStackScreenProps } from '../types/Navigation'
import { Colors } from '../types/Colors'
import { useTheme } from '@react-navigation/native'
import { ButtonGroup, Icon } from '@rneui/themed'
import { useContext, useEffect, useState } from 'react'
import TreatmentList from './TreatmentList'
import PaymentList from './PaymentList'
import { DataContext } from '../contexts/DataContext'
import { getPatientFullName } from '../helpers/PatientHelper'
import { getGroupedAppointments } from '../helpers/AppointmentHelper'
import { DateTime } from 'luxon'
import MyAgendaList from './MyAgendaList'
import MainView from './MainView'
import HeaderButton from './HeaderButton'
import { treatmentFinished } from '../helpers/TreatmentHelper'
import IonIcons from '@expo/vector-icons/Ionicons'
import DetailTab from './DetailTab'

export default function Patient({ navigation, route }: RootStackScreenProps<'Patient'>) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { colors } = useTheme()
  const { patientId } = route.params

  const context = useContext(DataContext)

  if (!context) {
    return
  }

  function handleEdit() {
    navigation.navigate('EditPatient', { patientId: patientId })
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title='Edit' onPress={handleEdit} />,
    })

    context.fetchAppointments()
    context.fetchTreatments()
    context.fetchPayments()
  }, [])

  const today = DateTime.local().toISODate()

  const patient = context.patients?.find((p) => p.id === patientId)
  const treatments = context.treatments?.filter((t) => t.patient_id === patient?.id && !treatmentFinished(t))
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
        <View style={styles(colors).infoField}>
          <IonIcons name='home-outline' size={22} color='rgb(140, 140, 140)' style={styles(colors).infoIcon} />
          <Text style={styles(colors).text}>{patient?.city}</Text>
        </View>
        <View style={styles(colors).infoField}>
          <IonIcons name='call-outline' size={22} color='rgb(140, 140, 140)' style={styles(colors).infoIcon} />
          <Text style={styles(colors).text}>{patient?.phone}</Text>
        </View>
        <View style={styles(colors).infoField}>
          <IonIcons
            name='information-circle-outline'
            size={22}
            color='rgb(140, 140, 140)'
            style={styles(colors).infoIcon}
          />
          <Text style={styles(colors).text}>{patient?.extra_info}</Text>
        </View>
      </View>
      <View style={styles(colors).additionalInfoView}>
        <ButtonGroup
          buttons={buttons}
          buttonStyle={{ backgroundColor: colors.background }}
          containerStyle={{ borderColor: colors.border, borderRadius: 20, marginLeft: 0, marginRight: 0, height: 45 }}
          innerBorderStyle={{ color: colors.border }}
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
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    infoField: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    infoIcon: {
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
