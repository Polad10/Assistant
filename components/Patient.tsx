import { View, Text, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types/Navigation';
import { Colors } from '../types/Colors';
import { useTheme } from '@react-navigation/native';
import { Button, ButtonGroup, Icon } from '@rneui/themed';
import { useCallback, useState } from 'react';
import AgendaItem from './AgendaItem';
import { AgendaList } from 'react-native-calendars';
import TreatmentGroup from './TreatmentGroup';

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

export default function Patient({ route }: RootStackScreenProps<'Patient'>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { colors } = useTheme();
  const { patient } = route.params;

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  const buttons = [
    {
      element: () => (
        <Icon
          name='calendar'
          size={22}
          type='font-awesome-5'
          color={selectedIndex === 0 ? colors.text : colors.background}
        />
      ),
    },
    {
      element: () => (
        <Icon
          name='tooth'
          size={22}
          type='font-awesome-5'
          color={selectedIndex === 1 ? colors.text : colors.background}
        />
      ),
    },
    {
      element: () => (
        <Icon
          name='money-bill-alt'
          size={22}
          type='font-awesome-5'
          color={selectedIndex === 2 ? colors.text : colors.background}
        />
      ),
    },
  ];

  const TabContent = () => {
    switch (selectedIndex) {
      case 0:
        return <AgendaList sections={items} renderItem={renderItem} sectionStyle={styles(colors).agendaSection} />;
      case 1:
        return (
          <View>
            <Button
              title='Load previous treatments'
              size='sm'
              containerStyle={{ marginHorizontal: 10, marginTop: 10 }}
              buttonStyle={{ backgroundColor: colors.border }}
            />
            <TreatmentGroup />
          </View>
        );
      case 2:
        return null;
      default:
        return null;
    }
  };

  return (
    <View style={styles(colors).mainView}>
      <View style={[styles(colors).headerView, styles(colors).card]}>
        <Text style={styles(colors).title}>{patient}</Text>
      </View>
      <View style={[styles(colors).infoView, styles(colors).card]}>
        <Text style={styles(colors).text}>City: Eindhoven</Text>
        <Text style={styles(colors).text}>Phone number: +31606060606</Text>
        <Text style={styles(colors).text}>Extra info: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      </View>
      <View style={[styles(colors).additionalInfoView, styles(colors).card]}>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={(value) => setSelectedIndex(value)}
          selectedButtonStyle={{ backgroundColor: colors.primary }}
        />
        <TabContent />
      </View>
    </View>
  );
}

const styles = (colors: Colors) =>
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
      color: colors.text,
      fontSize: 25,
    },
    text: {
      color: colors.text,
      fontSize: 18,
      marginTop: 5,
    },
    card: {
      backgroundColor: colors.card,
      marginTop: 5,
    },
    agendaSection: {
      backgroundColor: colors.card,
      color: colors.text,
    },
  });
