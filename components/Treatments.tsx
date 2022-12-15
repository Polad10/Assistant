import { View, StyleSheet } from 'react-native';
import MyFAB from './MyFAB';
import MySearchBar from './MySearchBar';
import { Divider } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import TreatmentItem from './TreatmentItem';
import { Status } from '../enums/Status';

export default function Treatments() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <MySearchBar />
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
      <MyFAB onPress={() => alert('New Treatment!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 13,
  },
});
