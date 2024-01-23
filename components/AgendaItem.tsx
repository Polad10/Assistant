import { memo, useCallback, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getPatientFullName } from '../helpers/PatientHelper'
import type { RootStackScreenProps } from '../types/Navigation'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import { Appointment } from '../modals/Appointment'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'

type ItemProps = {
  appointment: Appointment
}

const AgendaItem = (props: ItemProps) => {
  const { appointment } = props
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()
  const themeContext = useContext(ThemeContext)!
  const context = useContext(DataContext)!

  const treatment = context.treatments?.find((t) => t.id === appointment.treatment_id)
  const patient = context.patients?.find((p) => p.id === treatment?.patient_id)

  const itemPressed = useCallback(() => {
    navigation.navigate('EditAppointment', { appointmentId: appointment.id })
  }, [])

  return (
    <TouchableOpacity onPress={itemPressed} style={styles(themeContext).item}>
      <View style={styles(themeContext).mainView}>
        <View style={{ flex: 1 }}>
          <Text style={[styles(themeContext).defaultText, styles(themeContext).time]}>
            {DateTime.fromISO(appointment.datetime).toLocaleString(DateTime.TIME_24_SIMPLE)}
          </Text>
        </View>
        <View style={styles(themeContext).appointmentContent}>
          <View>
            <Text style={[styles(themeContext).defaultText, styles(themeContext).patient]}>
              {getPatientFullName(patient)}
            </Text>
          </View>
          <Text style={[styles(themeContext).defaultText, styles(themeContext).description]}>
            {appointment.actions}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = (themeContext: ThemeContextType) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      flexDirection: 'row',
    },
    item: {
      padding: 10,
      backgroundColor: themeContext.primary,
      flexDirection: 'row',
    },
    defaultText: {
      fontSize: 16,
      color: themeContext.neutral,
    },
    patient: {
      color: themeContext.info,
    },
    time: {
      color: themeContext.neutral,
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
      color: themeContext.neutral,
      fontSize: 14,
    },
  })

export default memo(AgendaItem)
