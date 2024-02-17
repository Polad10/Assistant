import { useCallback, useContext, useEffect, useState } from 'react'
import PatientForm from './PatientForm'
import { DeviceEventEmitter } from 'react-native'
import { PatientRequest } from '../modals/Patient'
import { DataContext } from '../contexts/DataContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import DeleteButton from './DeleteButton'
import { showDangerMessage, showMessage } from '../helpers/ToastHelper'
import LoadingView from './LoadingView'
import Error from './Error'
import { translate } from '../helpers/Translator'

export default function EditPatient() {
  const navigation = useNavigation<RootStackScreenProps<'EditPatient'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'EditPatient'>['route']>()
  const context = useContext(DataContext)!

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const patientId = route.params.patientId
  const patient = context.patients?.find((p) => p.id === patientId)

  const handlePatientSave = useCallback(async (patient: PatientRequest) => {
    try {
      setLoading(true)
      await context.updatePatient(patient)

      showMessage(translate('saved'))
      navigation.goBack()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const patientSaveListener = DeviceEventEmitter.addListener('patientSaved', handlePatientSave)
    const patientDeleteListener = DeviceEventEmitter.addListener('entityDeleted', handleDelete)

    return () => {
      patientSaveListener.remove()
      patientDeleteListener.remove()
    }
  }, [])

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true)
      await context.deletePatient(patientId)

      showDangerMessage(translate('patientDeleted'))
      navigation.popToTop()
    } catch (ex) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <MainView>
      <PatientForm patient={patient} pageName='EditPatient' />
      <DeleteButton />
      {loading && <LoadingView />}
      {error && <Error onBtnPress={() => setError(false)} />}
    </MainView>
  )
}
