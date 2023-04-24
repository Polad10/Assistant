import { DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';
import Appointment from './Appointment';
import { Mode } from '../enums/Mode';
import { RootStackScreenProps } from '../types/Navigation';

export default function NewAppointment({ navigation }: RootStackScreenProps<'NewAppointment'>) {
  const [treatment, setTreatment] = useState<string>();

  useEffect(() => {
    DeviceEventEmitter.addListener('treatmentSelected', handleTreatmentSelect);

    return () => {
      DeviceEventEmitter.removeAllListeners('treatmentSelected');
    };
  }, []);

  return <Appointment mode={Mode.NEW} treatment={treatment} />;

  function handleTreatmentSelect(treatment: string) {
    navigation.goBack();
    setTreatment(treatment);
  }
}
