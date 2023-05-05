import { View, StyleSheet, ScrollView } from 'react-native';
import TreatmentItem from './TreatmentItem';
import { Status } from '../enums/Status';
import { Divider } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../types/Colors';

export default function TreatmentList() {
  const { colors } = useTheme();

  return (
    <View style={styles(colors).mainView}>
      <ScrollView>
        <TreatmentItem
          description='Lorem ipsum dolor sit amet consectetur.'
          patientName='Polad Mammadov'
          startDate={new Date()}
          status={Status.ONGOING}
        />
        <Divider color={colors.border} style={styles(colors).divider} />
        <TreatmentItem
          description='Lorem ipsum dolor sit amet consectetur.'
          patientName='Polad Mammadov'
          startDate={new Date()}
          status={Status.FINISHED}
        />
        <Divider color={colors.border} style={styles(colors).divider} />
        <TreatmentItem
          description='Lorem ipsum dolor sit amet consectetur.'
          patientName='Polad Mammadov'
          startDate={new Date()}
          status={Status.FINISHED}
        />
        <Divider color={colors.border} style={styles(colors).divider} />
      </ScrollView>
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    divider: {
      marginHorizontal: 13,
    },
  });
