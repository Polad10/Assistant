import { memo, useCallback, useContext } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../types/Colors'
import { getPatientFullName } from '../helpers/PatientHelper'
import type { RootStackScreenProps } from '../types/Navigation'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import { Appointment } from '../modals/Appointment'

type ItemProps = {
  appointment: Appointment
}

const AgendaItem = (props: ItemProps) => {
  const { appointment } = props
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()
  const context = useContext(DataContext)!

  const treatment = context.treatments?.find((t) => t.id === appointment.treatment_id)
  const patient = context.patients?.find((p) => p.id === treatment?.patient_id)

  const itemPressed = useCallback(() => {
    navigation.navigate('EditAppointment', { appointmentId: appointment.id })
  }, [])

  return (
    <TouchableOpacity onPress={itemPressed} style={styles(colors).item}>
      <View style={styles(colors).mainView}>
        <View style={{ flex: 1 }}>
          <Text style={[styles(colors).defaultText, styles(colors).time]}>
            {DateTime.fromISO(appointment.datetime).toLocaleString(DateTime.TIME_24_SIMPLE)}
          </Text>
        </View>
        <View style={styles(colors).appointmentContent}>
          <View>
            <Text style={[styles(colors).defaultText, styles(colors).patient]}>{getPatientFullName(patient)}</Text>
          </View>
          <Text style={[styles(colors).defaultText, styles(colors).description]}>{appointment.actions}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      flexDirection: 'row',
    },
    item: {
      padding: 10,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: 'row',
    },
    defaultText: {
      fontSize: 16,
      color: colors.text,
    },
    patient: {
      color: colors.notification,
    },
    time: {
      color: colors.text,
      fontWeight: 'bold',
    },
    appointmentContent: {
      flex: 4,
    },
    description: {
      marginTop: 10,
      fontStyle: 'italic',
    },
    emptyItem: {
      paddingLeft: 20,
      height: 52,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
    },
    emptyItemText: {
      color: colors.text,
      fontSize: 14,
    },
  })

export default memo(AgendaItem)
