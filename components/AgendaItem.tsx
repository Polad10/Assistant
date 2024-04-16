import { memo, useCallback, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { getPatientFullName } from '../helpers/PatientHelper'
import type { RootStackScreenProps } from '../types/Navigation'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import { Appointment } from '../models/Appointment'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Badge } from '@rneui/themed'
import { AppointmentStatus } from '../enums/AppointmentStatus'
import ItemAction from './ItemActions/ItemAction'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { TranslationKeys } from '../localization/TranslationKeys'
import ItemActionDelete from './ItemActions/ItemActionDelete'
import { ToastContext } from '../contexts/ToastContext'

type ItemProps = {
  appointment: Appointment
}

const AgendaItem = (props: ItemProps) => {
  const navigation = useNavigation<RootStackScreenProps<'Appointments'>['navigation']>()
  const themeContext = useContext(ThemeContext)!
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const { appointment } = props
  const translator = localizationContext.translator
  const toast = toastContext.toast!

  const treatment = dataContext.treatments?.find((t) => t.id === appointment.treatment_id)
  const patient = dataContext.patients?.find((p) => p.id === treatment?.patient_id)

  const itemPressed = useCallback(() => {
    navigation.navigate('EditAppointment', { appointmentId: appointment.id })
  }, [])

  async function updateStatus(status: AppointmentStatus) {
    try {
      DeviceEventEmitter.emit('loading')

      const updatedAppointment = { ...appointment }
      updatedAppointment.status = status

      await dataContext.updateAppointment(updatedAppointment)

      if (status === AppointmentStatus.Cancelled) {
        toast.showWarningMessage(translator.translate('appointmentCancelled'))
      } else if (status === AppointmentStatus.Finished) {
        toast.showSuccessMessage(translator.translate('appointmentFinished'))
      } else {
        toast.showMessage(translator.translate('appointmentRestored'))
      }
    } catch (ex) {
      toast.showDangerMessage(translator.translate('somethingWentWrongMessage'))
    } finally {
      DeviceEventEmitter.emit('loadingFinished')
    }
  }

  async function deleteAppointment() {
    try {
      DeviceEventEmitter.emit('loading')

      await dataContext.deleteAppointment(appointment.id)

      toast.showDangerMessage(translator.translate('appointmentDeleted'))
    } catch (ex) {
      toast.showDangerMessage(translator.translate('somethingWentWrongMessage'))
    } finally {
      DeviceEventEmitter.emit('loadingFinished')
    }
  }

  function rightActions() {
    let actions = undefined

    if (appointment.datetime >= DateTime.local().toISODate()!) {
      if (appointment.status !== AppointmentStatus.Expected) {
        actions = (
          <ItemAction
            title={translator.translate('restore')}
            backgroundColor={themeContext.secondary}
            iconName='arrow-undo-circle-outline'
            onPress={() => updateStatus(AppointmentStatus.Expected)}
          />
        )
      } else {
        actions = (
          <>
            <ItemAction
              title={translator.translate('finish')}
              backgroundColor={themeContext.success}
              iconName='checkmark-circle-outline'
              onPress={() => updateStatus(AppointmentStatus.Finished)}
            />
            <ItemAction
              title={translator.translate('cancel')}
              backgroundColor={themeContext.warning}
              iconName='remove-circle-outline'
              onPress={() => updateStatus(AppointmentStatus.Cancelled)}
            />
          </>
        )
      }
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        {actions}
        <ItemActionDelete onPress={deleteAppointment} />
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={rightActions}>
      <View style={{ backgroundColor: themeContext.primary }}>
        <TouchableOpacity onPress={itemPressed} style={styles(themeContext).item}>
          <View style={styles(themeContext).mainView}>
            <View style={{ width: 60 }}>
              <Text
                style={[
                  styles(themeContext).defaultText,
                  styles(themeContext).time,
                  statusStyles(appointment.status, themeContext).text,
                ]}
              >
                {DateTime.fromISO(appointment.datetime).toLocaleString(DateTime.TIME_24_SIMPLE)}
              </Text>
            </View>
            <View style={styles(themeContext).appointmentContent}>
              <View>
                <Text
                  style={[
                    styles(themeContext).defaultText,
                    styles(themeContext).patient,
                    statusStyles(appointment.status, themeContext).text,
                  ]}
                >
                  {getPatientFullName(patient)}
                </Text>
              </View>
              <Text
                style={[
                  styles(themeContext).defaultText,
                  styles(themeContext).description,
                  statusStyles(appointment.status, themeContext).text,
                ]}
              >
                {appointment.actions}
              </Text>
            </View>
            <View style={{ width: 100, marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Badge badgeStyle={statusStyles(appointment.status, themeContext).badge} />
                <Text style={{ color: themeContext.neutral, marginLeft: 10 }}>
                  {translator.translate(AppointmentStatus[appointment.status].toLowerCase() as keyof TranslationKeys)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
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
      flex: 1,
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

const statusStyles = (status: AppointmentStatus, themeContext: ThemeContextType) => {
  let color = themeContext.defaultStatus
  let opacity = 1
  let textDecorationLine: 'none' | 'line-through' = 'none'

  if (status == AppointmentStatus.Cancelled) {
    color = themeContext.error
    opacity = 0.5
    textDecorationLine = 'line-through'
  }

  if (status == AppointmentStatus.Finished) {
    color = themeContext.success
    opacity = 0.5
  }

  return StyleSheet.create({
    badge: {
      backgroundColor: color,
      borderColor: color,
    },
    text: {
      opacity: opacity,
      textDecorationLine: textDecorationLine,
    },
  })
}

export default memo(AgendaItem)
