import { useNavigation, useRoute } from '@react-navigation/native'
import TreatmentForm from './TreatmentForm'
import { useCallback, useContext, useEffect } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import { DataContext } from '../contexts/DataContext'
import { TreatmentRequest } from '@polad10/assistant-models/Treatment'
import { DeviceEventEmitter, SafeAreaView, StyleSheet } from 'react-native'
import MainView from './MainView'
import { Button } from '@rneui/themed'

export default function EditTreatment() {
  const navigation = useNavigation<RootStackScreenProps<'EditTreatment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditTreatment'>['route']>()
  const context = useContext(DataContext)

  if (!context) {
    return
  }

  const treatmentId = route.params.treatmentId
  const treatment = context.treatments?.find((t) => t.id === treatmentId)
  const patient = context.patients?.find((p) => p.id === treatment?.patient_id)

  const handleTreatmentSave = useCallback(async (treatment: TreatmentRequest) => {
    await context.updateTreatment(treatment)

    navigation.goBack()
  }, [])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('treatmentSaved', handleTreatmentSave)

    return () => {
      listener.remove()
    }
  }, [])

  const handleDelete = useCallback(async () => {
    if (patient) {
      await context.deleteTreatment(treatmentId)

      navigation.navigate('Patient', { patientId: patient.id })
    }
  }, [])

  return (
    <MainView>
      <TreatmentForm pageName='EditTreatment' patient={patient} treatment={treatment} />
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
