import MySearchBar, { SearchBarRefType } from './MySearchBar'
import TreatmentList from './TreatmentList'
import { RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { DeviceEventEmitter } from 'react-native'
import { getOngoingTreatments, getPatientTreatments, treatmentFinished } from '../helpers/TreatmentHelper'
import { TreatmentWithPatientName } from '../types/TreatmentWithPatientName'
import { searchTreatments } from '../helpers/Searcher'
import MyFAB from './MyFAB'
import { useNavigation } from '@react-navigation/native'

export default function Treatments({ route }: RootStackScreenProps<'Treatments'>) {
  const context = useContext(DataContext)
  const navigation = useNavigation<RootStackScreenProps<'Treatments'>['navigation']>()
  const searchEventName = 'searchTreatment'

  const [treatments, setTreatments] = useState<TreatmentWithPatientName[]>([])
  const [treatmentsInitial, setTreatmentsInitial] = useState<TreatmentWithPatientName[]>([])

  if (!context) {
    return
  }

  const ref = useRef<SearchBarRefType>()

  const patient = route.params?.patient

  const handleSearch = useCallback(
    (search: string) => {
      const foundTreatments = searchTreatments(treatmentsInitial, search)

      setTreatments(foundTreatments)
    },
    [treatmentsInitial]
  )

  useEffect(() => {
    context.fetchTreatments()
    context.fetchPatients()
  }, [])

  useEffect(() => {
    ref.current?.clear()

    const treatments = patient ? getPatientTreatments(context.treatments ?? [], patient.id) : context.treatments
    const ongoingTreatments = getOngoingTreatments(treatments ?? [])

    const treatmentsWithPatientName: TreatmentWithPatientName[] =
      ongoingTreatments?.map((t) => {
        const patient = context.patients?.find((p) => p.id === t.patient_id)

        return {
          patientFirstName: patient?.first_name,
          patientLastName: patient?.last_name,
          ...t,
        }
      }) ?? []

    setTreatments(treatmentsWithPatientName)
    setTreatmentsInitial(treatmentsWithPatientName)
  }, [context.treatments])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(searchEventName, handleSearch)

    return () => {
      listener.remove()
    }
  }, [handleSearch])

  return (
    <MainView>
      <MySearchBar searchEventName={searchEventName} ref={ref} />
      <TreatmentList pageName='Treatments' treatments={treatments ?? []} />
      <MyFAB onPress={() => navigation.navigate('NewTreatment', { patient: patient })} />
    </MainView>
  )
}
