import { View, Text, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types/Navigation';
import { Colors } from '../types/Colors';
import { useTheme } from '@react-navigation/native';
import { ButtonGroup, Icon } from '@rneui/themed';
import { useState } from 'react';

export default function Patient({ route }: RootStackScreenProps<'Patient'>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { colors } = useTheme();
  const { patient } = route.params;

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
  });
