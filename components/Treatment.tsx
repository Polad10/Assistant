import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import DetailTab from './DetailTab'
import { View, StyleSheet, Text } from 'react-native'
import MyFAB from './MyFAB'
import PaymentList from './PaymentList'
import { DataContext } from '../contexts/DataContext'
import { getPatientFullName } from '../helpers/PatientHelper'
import { getAgendaItems, getGroupedAppointments } from '../helpers/AppointmentHelper'
import { Status } from '../enums/Status'
import MainView from './MainView'
import MyAgendaList from './MyAgendaList'
import HeaderButton from './HeaderButton'
import { treatmentFinished } from '../helpers/TreatmentHelper'
import MyButtonGroup from './MyButtonGroup'
import { Chip } from '@rneui/themed'
import IonIcons from '@expo/vector-icons/Ionicons'
import TreatmentInfo from './TreatmentInfo'
import { getTreatmentPayments } from '../helpers/PaymentHelper'
import NoPayments from './user-messages/NoPayments'
import NoAppointments from './user-messages/NoAppointments'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { TranslationKeys, translate } from '../helpers/Translator'

type StyleProps = {
  themeContext: ThemeContextType
  treatmentFinished: boolean | undefined
}

export default function Treatment({ route }: RootStackScreenProps<'Treatment'>) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const themeContext = useContext(ThemeContext)!
  const { treatmentId } = route.params

  const navigation = useNavigation<RootStackScreenProps<'Treatment'>['navigation']>()
  const context = useContext(DataContext)!

  function handleEdit() {
    navigation.navigate('EditTreatment', { treatmentId: treatmentId })
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title={translate('edit')} onPress={handleEdit} />,
    })
  }, [])

  const treatment = context.treatments?.find((t) => t.id === treatmentId)

  if (!treatment) {
    return
  }

  const patient = context.patients?.find((p) => p.id === treatment?.patient_id)
  const appointments = context.appointments?.filter((a) => a.treatment_id === treatment?.id) ?? []
  const payments = getTreatmentPayments(context.payments ?? [], treatment.id)

  const groupedAppointments = getGroupedAppointments(appointments) ?? new Map()
  const agendaItems = getAgendaItems(groupedAppointments)

  const styleProps: StyleProps = {
    themeContext: themeContext,
    treatmentFinished: treatmentFinished(treatment),
  }

  const buttons = [
    {
      element: () => (
        <DetailTab name='information-circle-outline' type='ionicon' index={0} selectedIndex={selectedIndex} />
      ),
    },
    {
      element: () => <DetailTab name='calendar' type='feather' index={1} selectedIndex={selectedIndex} />,
    },
    {
      element: () => <DetailTab name='cash-outline' type='ionicon' index={2} selectedIndex={selectedIndex} />,
    },
  ]

  const TabContent = () => {
    switch (selectedIndex) {
      case 0:
        return <TreatmentInfo treatment={treatment} />
      case 1:
        if (agendaItems.length > 0) {
          return (
            <MainView>
              <MyAgendaList sections={agendaItems} pageName='Treatment' />
              <MyFAB onPress={() => navigation.navigate('NewAppointment', { treatment: treatment })} />
            </MainView>
          )
        } else {
          return (
            <NoAppointments addBtnOnPress={() => navigation.navigate('NewAppointment', { treatment: treatment })} />
          )
        }
      case 2:
        if (payments.length > 0) {
          return (
            <MainView>
              <PaymentList pageName='Treatment' payments={payments} />
              <MyFAB onPress={() => navigation.navigate('NewPayment', { treatmentId: treatment.id })} />
            </MainView>
          )
        } else {
          return <NoPayments addBtnOnPress={() => navigation.navigate('NewPayment', { treatmentId: treatment.id })} />
        }
      default:
        return null
    }
  }

  const status = styleProps.treatmentFinished ? Status.FINISHED : Status.ONGOING

  return (
    <MainView>
      <View style={[styles(styleProps).headerView, styles(styleProps).card]}>
        <Text style={styles(styleProps).title}>{treatment.title}</Text>
        <View style={styles(styleProps).statusView}>
          <Chip
            title={translate(status.toLowerCase() as keyof TranslationKeys)}
            type='outline'
            titleStyle={styles(styleProps).status}
            buttonStyle={styles(styleProps).statusButton}
          />
        </View>
      </View>
      <View style={styles(styleProps).card}>
        <View style={styles(styleProps).infoField}>
          <IonIcons name='person-outline' size={22} style={styles(styleProps).infoIcon} />
          <Text style={styles(styleProps).text}>{getPatientFullName(patient)}</Text>
        </View>
      </View>
      <MyButtonGroup buttons={buttons} selectedIndex={selectedIndex} onPress={(value) => setSelectedIndex(value)} />
      <View style={styles(styleProps).additionalInfoView}>
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
    infoField: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    infoIcon: {
      color: styleProps.themeContext.neutral,
      opacity: 0.5,
      marginRight: 10,
    },
    additionalInfoView: {
      flex: 1,
    },
    title: {
      color: styleProps.themeContext.neutral,
      fontSize: 25,
    },
    text: {
      color: styleProps.themeContext.neutral,
      fontSize: 20,
    },
    card: {
      backgroundColor: styleProps.themeContext.secondary,
      padding: 20,
      marginTop: 5,
    },
    statusView: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-end',
    },
    status: {
      color: styleProps.treatmentFinished ? 'lightgreen' : 'orange',
    },
    statusButton: {
      borderColor: styleProps.treatmentFinished ? 'lightgreen' : 'orange',
    },
  })
