import { View, StyleSheet, DeviceEventEmitter } from 'react-native'
import MyInput from './MyInput'
import { useEffect, useState } from 'react'
import DateTimeInput from './DateTimeInput'
import { RootStackScreenProps } from '../types/Navigation'

type StyleProps = {
  patientEditable: boolean
}

export default function NewTreatment({ navigation, route }: RootStackScreenProps<'NewTreatment'>) {
  const [patient, setPatient] = useState<string | undefined>(route.params.patient)

  let patientEditable = patient == null

  const styleProps: StyleProps = {
    patientEditable: patientEditable,
  }

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('patientSelected', handlePatientSelect)

    return () => {
      listener.remove()
    }
  }, [])

  return (
    <View style={styles(styleProps).mainView}>
      <DateTimeInput text='Start date' showDatePicker={true} />
      <MyInput placeholder='Title' />
      <MyInput
        placeholder='Choose patient'
        onPressIn={handlePatientChange}
        value={patient}
        editable={false}
        style={styles(styleProps).patient}
      />
    </View>
  )

  function handlePatientSelect(patient: string) {
    navigation.goBack()
    setPatient(patient)
  }

  function handlePatientChange() {
    if (patientEditable) {
      navigation.navigate('Patients')
    }
  }
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
    },
    patient: {
      opacity: styleProps.patientEditable ? 1 : 0.5,
    },
  })
