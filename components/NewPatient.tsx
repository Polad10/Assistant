import { useCallback, useContext, useEffect } from 'react'
import PatientForm from './PatientForm'
import { DeviceEventEmitter } from 'react-native'
import { PatientRequest } from '@polad10/assistant-models/Patient'
import { DataContext } from '../contexts/DataContext'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'

export default function NewPatient() {
  const navigation = useNavigation<RootStackScreenProps<'NewPatient'>['navigation']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const handlePatientSave = useCallback(async (patient: PatientRequest) => {
    const newPatient = await context.createPatient(patient)

    if (DeviceEventEmitter.listenerCount('patientCreated') > 0) {
      DeviceEventEmitter.emit('patientCreated', newPatient)
    } else {
      navigation.goBack()
    }
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('patientSaved', handlePatientSave)

    return () => {
      listener.remove()
    }
  }, [])

  return <PatientForm pageName='NewPatient' />
}
