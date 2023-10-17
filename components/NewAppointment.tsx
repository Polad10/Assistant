import { DeviceEventEmitter } from 'react-native'
import { useEffect, useState } from 'react'
import Appointment from './Appointment'
import { Mode } from '../enums/Mode'
import { RootStackScreenProps } from '../types/Navigation'
import Treatment from '@polad10/assistant-models/Treatment'

export default function NewAppointment({ navigation }: RootStackScreenProps<'NewAppointment'>) {
  return <Appointment mode={Mode.NEW} />
}
