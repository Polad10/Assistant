import { StyleSheet, DeviceEventEmitter } from 'react-native'
import MyInput from './MyInput'
import { useEffect, useState } from 'react'
import DateTimeInput from './DateTimeInput'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { getPatientFullName } from '../helpers/PatientHelper'
import Patient from '@polad10/assistant-models/Patient'

type StyleProps = {
  patientEditable: boolean
}

export default function NewTreatment({ navigation, route }: RootStackScreenProps<'NewTreatment'>) {
  const [patient, setPatient] = useState<Patient | undefined>(route.params.patient)

  let styleProps: StyleProps = {
    patientEditable: true,
  }

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('patientSelected', handlePatientSelect)

    styleProps.patientEditable = patient == null

    return () => {
      listener.remove()
    }
  }, [])

  function getSelectedPatientFullName() {
    return patient ? getPatientFullName(patient) : ''
  }

  return (
    <MainView>
      <DateTimeInput text='Start date' showDatePicker={true} datetime={new Date()} />
      <MyInput placeholder='Title' />
      <MyInput
        placeholder='Choose patient'
        onPressIn={handlePatientChange}
        value={getSelectedPatientFullName()}
        editable={false}
        style={styles(styleProps).patient}
      />
    </MainView>
  )

  function handlePatientSelect(patient: Patient) {
    navigation.goBack()
    setPatient(patient)
  }

  function handlePatientChange() {
    if (styleProps.patientEditable) {
      navigation.navigate('Patients', { pageName: 'NewTreatment', preventDefault: true })
    }
  }
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    patient: {
      opacity: styleProps.patientEditable ? 1 : 0.5,
    },
  })
