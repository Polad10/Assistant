import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../types/Colors';
import { useTheme } from '@react-navigation/native';

type Props = {
  text: string;
  showDatePicker?: boolean;
  showTimePicker?: boolean;
};

type StyleProps = {
  colors: Colors;
  showDatePicker?: boolean;
  showTimePicker?: boolean;
};

export default function DateTimeInput(props: Props) {
  const { colors } = useTheme();

  const styleProps: StyleProps = {
    colors: colors,
    showDatePicker: props.showDatePicker,
    showTimePicker: props.showTimePicker,
  };

  return (
    <View style={styles(styleProps).dateTimeContainer}>
      <Text style={styles(styleProps).text}>{props.text}</Text>
      <View style={styles(styleProps).dateTime}>
        <DateTimePicker mode='date' value={new Date()} style={styles(styleProps).datePicker} />
        <DateTimePicker mode='time' value={new Date()} style={styles(styleProps).timePicker} />
      </View>
    </View>
  );
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    dateTimeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: styleProps.colors.border,
      borderBottomWidth: 1,
      marginHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 15,
    },
    text: {
      color: styleProps.colors.text,
      fontSize: 18,
    },
    datePicker: {
      display: styleProps.showDatePicker ? 'flex' : 'none',
    },
    timePicker: {
      marginLeft: 5,
      display: styleProps.showTimePicker ? 'flex' : 'none',
    },
    dateTime: {
      flexDirection: 'row',
    },
  });
