import { useCallback, useContext, useEffect } from 'react'
import PatientForm from './PatientForm'
import { DeviceEventEmitter, SafeAreaView, StyleSheet } from 'react-native'
import { PatientRequest } from '@polad10/assistant-models/Patient'
import { DataContext } from '../contexts/DataContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { Button } from '@rneui/themed'

export default function EditPatient() {
  const navigation = useNavigation<RootStackScreenProps<'EditPatient'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditPatient'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const patientId = route.params.patientId
  const patient = context.patients?.find((p) => p.id === patientId)

  const handlePatientSave = useCallback(async (patient: PatientRequest) => {
    await context.updatePatient(patient)

    navigation.goBack()
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('patientSaved', handlePatientSave)

    return () => {
      listener.remove()
    }
  }, [])

  const handleDelete = useCallback(async () => {
    await context.deletePatient(patientId)

    navigation.popToTop() // 'bug Patients' is not in the stack, so it opens a new model
  }, [])

  return (
    <MainView>
      <PatientForm patient={patient} pageName='EditPatient' />
      <SafeAreaView style={styles.buttonView}>
        <Button color='red' style={styles.button} onPress={handleDelete}>
          Delete
        </Button>
      </SafeAreaView>
    </MainView>
  )
}

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 10,
  },
})
