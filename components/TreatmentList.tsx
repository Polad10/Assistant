import { View, StyleSheet } from 'react-native';
import TreatmentItem from './TreatmentItem';
import { Status } from '../enums/Status';
import { Divider } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';

export default function TreatmentList() {
  const { colors } = useTheme();

  return (
    <View>
      <TreatmentItem
        description='Lorem ipsum dolor sit amet consectetur.'
        patientName='Polad Mammadov'
        startDate={new Date()}
        status={Status.ONGOING}
      />
      <Divider color={colors.border} style={styles.divider} />
      <TreatmentItem
        description='Lorem ipsum dolor sit amet consectetur.'
        patientName='Polad Mammadov'
        startDate={new Date()}
        status={Status.FINISHED}
      />
      <Divider color={colors.border} style={styles.divider} />
      <TreatmentItem
        description='Lorem ipsum dolor sit amet consectetur.'
        patientName='Polad Mammadov'
        startDate={new Date()}
        status={Status.FINISHED}
      />
      <Divider color={colors.border} style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 13,
  },
});
