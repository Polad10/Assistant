import { View, Text, StyleSheet } from 'react-native'
import MainView from './MainView'
import { Icon, LinearProgress } from '@rneui/themed'
import { DateTime } from 'luxon'
import { Treatment } from '../modals/Treatment'
import { Colors } from '../types/Colors'
import { useTheme } from '@react-navigation/native'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { getTotalPayment } from '../helpers/PaymentHelper'

type Props = {
  treatment: Treatment
}

export default function TreatmentInfo(props: Props) {
  const { colors } = useTheme()
  const context = useContext(DataContext)!

  const treatment = props.treatment

  const payments = context.payments?.filter((p) => p.treatment_id === treatment?.id) ?? []
  const totalPayment = getTotalPayment(payments)

  return (
    <MainView>
      <View style={[styles(colors).card, styles(colors).rounded, styles(colors).priceView]}>
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
          <View style={styles(colors).priceDetailsView}>
            <View>
              <Text style={styles(colors).text}>Price</Text>
              <Text style={[styles(colors).paymentsNrText, styles(colors).halfOpacity]}>
                {payments.length} Payments
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles(colors).valueText, styles(colors).bold]}>{totalPayment} ₼ </Text>
              <Text style={[styles(colors).valueText, styles(colors).halfOpacity]}> of </Text>
              <Text style={[styles(colors).valueText, styles(colors).bold]}> {treatment.price} ₼</Text>
            </View>
          </View>
          <LinearProgress
            style={{ marginTop: 10 }}
            value={totalPayment / treatment.price}
            color={colors.notification}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles(colors).startDateView, styles(colors).card, styles(colors).rounded]}>
          <Text style={styles(colors).text}>Start</Text>
          <Icon
            name='hourglass-start'
            type='font-awesome'
            color='orange'
            size={25}
            containerStyle={styles(colors).dateIconContainer}
          />
          <Text style={[styles(colors).valueText, styles(colors).bold]}>
            {DateTime.fromISO(treatment.start_date).toFormat('MMMM d, yyyy')}
          </Text>
        </View>
        <View style={[styles(colors).endDateView, styles(colors).card, styles(colors).rounded]}>
          <Text style={styles(colors).text}>End</Text>
          <Icon
            name='hourglass-end'
            type='font-awesome'
            color='lightgreen'
            size={25}
            containerStyle={styles(colors).dateIconContainer}
          />
          <Text style={[styles(colors).valueText, styles(colors).bold]}>
            {treatment.end_date ? DateTime.fromISO(treatment.end_date).toFormat('MMMM d, yyyy') : '-'}
          </Text>
        </View>
      </View>
    </MainView>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      padding: 20,
      marginTop: 5,
    },
    rounded: {
      borderRadius: 10,
    },
    priceView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 0,
    },
    priceDetailsView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      color: colors.text,
      fontSize: 20,
    },
    paymentsNrText: {
      color: colors.text,
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
    valueText: {
      color: colors.text,
      fontSize: 18,
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
