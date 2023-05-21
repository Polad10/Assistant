import { useNavigation, useTheme } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import AgendaItem from './AgendaItem'
import DetailTab from './DetailTab'
import { View, StyleSheet, Text } from 'react-native'
import { AgendaList } from 'react-native-calendars'
import MyFAB from './MyFAB'
import PaymentList from './PaymentList'
import { Colors } from '../types/Colors'
import { Status } from '../enums/Status'
import { ButtonGroup } from '@rneui/themed'

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

type StyleProps = {
  colors: Colors
  status: Status
}

export default function Treatment({ route }: RootStackScreenProps<'Treatment'>) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { colors } = useTheme()
  const { treatment, status, patientName, startDate } = route.params

  const navigation = useNavigation<RootStackScreenProps<'Treatment'>['navigation']>()

  const styleProps: StyleProps = {
    colors: colors,
    status: status,
  }

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />
  }, [])

  const buttons = [
    {
      element: () => <DetailTab iconName='calendar' index={0} selectedIndex={selectedIndex} />,
    },
    {
      element: () => <DetailTab iconName='money-bill-alt' index={1} selectedIndex={selectedIndex} />,
    },
  ]

  const TabContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <View style={styles(styleProps).mainView}>
            <AgendaList sections={items} renderItem={renderItem} sectionStyle={styles(styleProps).agendaSection} />
            <MyFAB onPress={() => navigation.navigate('NewAppointment')} />
          </View>
        )
      case 1:
        return <PaymentList pageName='Patient' />
      default:
        return null
    }
  }

  return (
    <View style={styles(styleProps).mainView}>
      <View style={[styles(styleProps).headerView, styles(styleProps).card]}>
        <Text style={styles(styleProps).title}>{treatment}</Text>
      </View>
      <View style={[styles(styleProps).infoView, styles(styleProps).card]}>
        <View style={styles(styleProps).statusView}>
          <Text style={styles(styleProps).text}>Status: </Text>
          <Text style={[styles(styleProps).text, styles(styleProps).status]}>{status}</Text>
        </View>
        <Text style={styles(styleProps).text}>Patient name: {patientName}</Text>
        <Text style={styles(styleProps).text}>Start date: {startDate}</Text>
      </View>
      <View style={[styles(styleProps).additionalInfoView, styles(styleProps).card]}>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={(value) => setSelectedIndex(value)}
          selectedButtonStyle={{ backgroundColor: colors.primary }}
        />
        <TabContent />
      </View>
    </View>
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
    },
    headerView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      flex: 1,
      paddingLeft: 5,
    },
    additionalInfoView: {
      flex: 3,
    },
    title: {
      color: styleProps.colors.text,
      fontSize: 25,
    },
    text: {
      color: styleProps.colors.text,
      fontSize: 18,
      marginTop: 5,
    },
    card: {
      backgroundColor: styleProps.colors.card,
      marginTop: 5,
    },
    agendaSection: {
      backgroundColor: styleProps.colors.card,
      color: styleProps.colors.text,
    },
    statusView: {
      flexDirection: 'row',
    },
    status: {
      color: styleProps.status == Status.ONGOING ? 'orange' : 'lightgreen',
    },
  })
