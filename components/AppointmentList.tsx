import { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { AgendaList } from 'react-native-calendars'
import AgendaItem from './AgendaItem'
import MyFAB from './MyFAB'
import { useNavigation, useTheme } from '@react-navigation/native'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import { Colors } from '../types/Colors'

type Props = {
  pageName: keyof RootStackParamList
}

const items = [
  {
    title: '2022-11-27',
    data: [
      {
        hour: '12am',
        title: 'Appointment-1',
      },
      {
        hour: '1pm',
        title: 'Appointment-2',
      },
    ],
  },
  {
    title: '2022-11-28',
    data: [
      {
        hour: '2pm',
        title: 'Appointment-3',
      },
      {
        hour: '3pm',
        title: 'Appointment-4',
      },
    ],
  },
]

export default function AppointmentList(props: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem appointment={item} />
  }, [])

  return (
    <View>
      <AgendaList sections={items} renderItem={renderItem} sectionStyle={styles(colors).agendaSection} />
      <MyFAB onPress={() => navigation.navigate('NewAppointment')} style={{ backgroundColor: 'red' }} />
    </View>
  )
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    agendaSection: {
      backgroundColor: colors.card,
      color: colors.text,
    },
  })
