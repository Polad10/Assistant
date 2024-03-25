import { View, Text, StyleSheet } from 'react-native'
import MainView from './MainView'
import { Icon, LinearProgress } from '@rneui/themed'
import { DateTime } from 'luxon'
import { Treatment } from '../modals/Treatment'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { getTotalPayment } from '../helpers/PaymentHelper'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { LocalizationContext } from '../contexts/LocalizationContext'

type Props = {
  treatment: Treatment
}

export default function TreatmentInfo(props: Props) {
  const dataContext = useContext(DataContext)!
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  const treatment = props.treatment
  const payments = dataContext.payments?.filter((p) => p.treatment_id === treatment?.id) ?? []
  const totalPayment = getTotalPayment(payments)

  return (
    <MainView>
      <View style={[styles(themeContext).card, styles(themeContext).rounded, styles(themeContext).priceView]}>
        <Icon
          containerStyle={{
            marginRight: 20,
          }}
          name='wallet-outline'
          type='ionicon'
          size={50}
          color='#ff00ff'
        />
        <View style={{ flex: 1 }}>
          <View style={styles(themeContext).priceDetailsView}>
            <View>
              <Text style={styles(themeContext).text}>{translator.translate('price')}</Text>
              <Text style={[styles(themeContext).paymentsNrText, styles(themeContext).halfOpacity]}>
                {payments.length} {translator.translate('payments')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles(themeContext).valueText, styles(themeContext).bold]}>{totalPayment} ₼ </Text>
              <Text style={[styles(themeContext).valueText, styles(themeContext).halfOpacity]}>
                {' '}
                {translator.translate('of')}{' '}
              </Text>
              <Text style={[styles(themeContext).valueText, styles(themeContext).bold]}> {treatment.price} ₼</Text>
            </View>
          </View>
          <LinearProgress style={{ marginTop: 10 }} value={totalPayment / treatment.price} color='#ff00ff' />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles(themeContext).startDateView, styles(themeContext).card, styles(themeContext).rounded]}>
          <Text style={styles(themeContext).text}>{translator.translate('start')}</Text>
          <Icon
            name='hourglass-start'
            type='font-awesome'
            color='orange'
            size={25}
            containerStyle={styles(themeContext).dateIconContainer}
          />
          <Text style={[styles(themeContext).valueText, styles(themeContext).bold]}>
            {DateTime.fromISO(treatment.start_date).setLocale(localizationContext.language).toFormat('MMMM d, yyyy')}
          </Text>
        </View>
        <View style={[styles(themeContext).endDateView, styles(themeContext).card, styles(themeContext).rounded]}>
          <Text style={styles(themeContext).text}>{translator.translate('end')}</Text>
          <Icon
            name='hourglass-end'
            type='font-awesome'
            color='lightgreen'
            size={25}
            containerStyle={styles(themeContext).dateIconContainer}
          />
          <Text style={[styles(themeContext).valueText, styles(themeContext).bold]}>
            {treatment.end_date
              ? DateTime.fromISO(treatment.end_date).setLocale(localizationContext.language).toFormat('MMMM d, yyyy')
              : '-'}
          </Text>
        </View>
      </View>
    </MainView>
  )
}

const styles = (themeContext: ThemeContextType) =>
  StyleSheet.create({
    card: {
      backgroundColor: themeContext.secondary,
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
      color: themeContext.neutral,
      fontSize: 20,
    },
    paymentsNrText: {
      color: themeContext.neutral,
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
      color: themeContext.neutral,
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
