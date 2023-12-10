import { useNavigation, useTheme } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
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
import { Chip, Icon } from '@rneui/themed'
import IonIcons from '@expo/vector-icons/Ionicons'
import { LinearProgress } from '@rneui/base'

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
        return (
          <MainView>
            <View style={[styles(styleProps).card, styles(styleProps).rounded]}>
              <View style={styles(styleProps).priceView}>
                <Icon
                  containerStyle={{
                    marginRight: 20,
                  }}
                  name='wallet-outline'
                  type='ionicon'
                  size={25}
                  color={colors.notification}
                  reverse
                />
                <View style={{ flex: 1 }}>
                  <View style={styles(styleProps).priceDetailsView}>
                    <View>
                      <Text style={styles(styleProps).text}>Price</Text>
                      <Text style={[styles(styleProps).paymentsNrText, styles(styleProps).halfOpacity]}>
                        {payments.length} Payments
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles(styleProps).valueText, styles(styleProps).bold]}>{totalPayments} ₼ </Text>
                      <Text style={[styles(styleProps).valueText, styles(styleProps).halfOpacity]}> of </Text>
                      <Text style={[styles(styleProps).valueText, styles(styleProps).bold]}> {treatment.price} ₼</Text>
                    </View>
                  </View>
                  <LinearProgress
                    style={{ marginTop: 10 }}
                    value={totalPayments / treatment.price}
                    color={colors.notification}
                  />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles(styleProps).startDateView, styles(styleProps).card, styles(styleProps).rounded]}>
                <Text style={styles(styleProps).text}>Start</Text>
                <Icon
                  name='hourglass-start'
                  type='font-awesome'
                  color='orange'
                  size={25}
                  containerStyle={styles(styleProps).dateIconContainer}
                />
                <Text style={[styles(styleProps).valueText, styles(styleProps).bold]}>
                  {DateTime.fromISO(treatment.start_date).toFormat('MMMM d, yyyy')}
                </Text>
              </View>
              <View style={[styles(styleProps).endDateView, styles(styleProps).card, styles(styleProps).rounded]}>
                <Text style={styles(styleProps).text}>End</Text>
                <Icon
                  name='hourglass-end'
                  type='font-awesome'
                  color='lightgreen'
                  size={25}
                  containerStyle={styles(styleProps).dateIconContainer}
                />
                <Text style={[styles(styleProps).valueText, styles(styleProps).bold]}>
                  {treatment.end_date ? DateTime.fromISO(treatment.end_date).toFormat('MMMM d, yyyy') : '-'}
                </Text>
              </View>
            </View>
          </MainView>
        )
      case 1:
        return (
          <MainView>
            <MyAgendaList sections={agendaItems} pageName='Treatment' />
            <MyFAB onPress={() => navigation.navigate('NewAppointment', { treatment: treatment })} />
          </MainView>
        )
      case 2:
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
        <View style={styles(styleProps).statusView}>
          <Chip
            title={status}
            type='outline'
            titleStyle={styles(styleProps).status}
            buttonStyle={styles(styleProps).statusButton}
          />
        </View>
      </View>
      <View style={styles(styleProps).card}>
        <View style={styles(styleProps).infoField}>
          <IonIcons name='person-outline' color='rgb(140, 140, 140)' size={22} style={styles(styleProps).infoIcon} />
          <Text style={styles(styleProps).text}>{getPatientFullName(patient)}</Text>
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
      color: styleProps.colors.text,
      fontSize: 25,
    },
    text: {
      color: styleProps.colors.text,
      fontSize: 20,
    },
    valueText: {
      color: styleProps.colors.text,
      fontSize: 18,
    },
    paymentsNrText: {
      color: styleProps.colors.text,
      fontSize: 16,
      marginTop: 5,
    },
    halfOpacity: {
      opacity: 0.5,
      fontWeight: '200',
    },
    bold: {
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: styleProps.colors.card,
      padding: 20,
      marginTop: 5,
    },
    rounded: {
      borderRadius: 10,
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
    priceView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    priceDetailsView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    startDateView: {
      flex: 1,
      marginRight: 2.5,
    },
    endDateView: {
      flex: 1,
      marginLeft: 2.5,
    },
    dateIconContainer: {
      alignItems: 'flex-start',
      marginTop: 25,
      marginBottom: 15,
    },
  })
