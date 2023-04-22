import { DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';
import Appointment from './Appointment';
import { Mode } from '../enums/Mode';

export default function NewAppointment({ navigation }: any) {
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
