import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CalendarProvider, ExpandableCalendar, AgendaList } from 'react-native-calendars';
import { useCallback } from 'react';
import AgendaItem from './AgendaItem';
import { Colors } from '../types/Colors';
import MyFAB from './MyFAB';
import NewAppointment from './NewAppointment';

export default function Appointments({ navigation }: any) {
  const { colors } = useTheme();

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

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
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CalendarProvider
        showTodayButton={true}
        date={new Date().toDateString()}
        theme={{ todayButtonTextColor: colors.text }}
        todayButtonStyle={styles(colors).todayButton}
      >
        <ExpandableCalendar
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            arrowColor: colors.primary,
            monthTextColor: colors.text,
            textSectionTitleColor: colors.text,
            todayTextColor: colors.primary,
            selectedDayBackgroundColor: colors.primary,
          }}
          style={{ backgroundColor: 'black' }}
        />
        <AgendaList sections={items} renderItem={renderItem} sectionStyle={styles(colors).agendaSection} />
      </CalendarProvider>
      <MyFAB onPress={() => navigation.navigate('NewAppointment')} />
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    agendaSection: {
      backgroundColor: colors.card,
      color: colors.text,
    },
    todayButton: {
      backgroundColor: colors.primary,
    },
  });
