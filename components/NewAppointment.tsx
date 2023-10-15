import { DeviceEventEmitter } from 'react-native'
import { useEffect, useState } from 'react'
import Appointment from './Appointment'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'
import Treatment from '@polad10/assistant-models/Treatment'

export default function NewAppointment({ navigation }: RootStackScreenProps<'NewAppointment'>) {
  const [treatment, setTreatment] = useState<Treatment | undefined>(undefined)

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('treatmentSelected', handleTreatmentSelect)

    return () => {
      listener.remove()
    }
  }, [])

  return <Appointment mode={Mode.NEW} treatment={treatment} />

  function handleTreatmentSelect(treatment: Treatment) {
    navigation.goBack()
    setTreatment(treatment)
  }
}
