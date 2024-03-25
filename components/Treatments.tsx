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
import NoTreatments from './user-messages/NoTreatments'
import { LocalizationContext } from '../contexts/LocalizationContext'

export default function Treatments({ route }: RootStackScreenProps<'Treatments'>) {
  const navigation = useNavigation<RootStackScreenProps<'Treatments'>['navigation']>()
  const dataContext = useContext(DataContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator
  const searchEventName = 'searchTreatment'

  const [treatments, setTreatments] = useState<TreatmentWithPatientName[]>([])
  const [treatmentsInitial, setTreatmentsInitial] = useState<TreatmentWithPatientName[]>([])

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
    ref.current?.clear()

    const treatments = patient ? getPatientTreatments(dataContext.treatments ?? [], patient.id) : dataContext.treatments
    const ongoingTreatments = getOngoingTreatments(treatments ?? [])

    const treatmentsWithPatientName: TreatmentWithPatientName[] =
      ongoingTreatments?.map((t) => {
        const patient = dataContext.patients?.find((p) => p.id === t.patient_id)

        return {
          patientFirstName: patient?.first_name,
          patientLastName: patient?.last_name,
          ...t,
        }
      }) ?? []

    setTreatments(treatmentsWithPatientName)
    setTreatmentsInitial(treatmentsWithPatientName)
  }, [dataContext.treatments])

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(searchEventName, handleSearch)

    return () => {
      listener.remove()
    }
  }, [handleSearch])

  function getTreatmentsContentView() {
    if (treatmentsInitial.length > 0) {
      return (
        <MainView>
          <MySearchBar
            placeholder={`${translator.translate('enterPatientName')}...`}
            searchEventName={searchEventName}
            ref={ref}
          />
          <TreatmentList pageName='Treatments' treatments={treatments ?? []} />
          <MyFAB onPress={() => navigation.navigate('NewTreatment', { patient: patient })} />
        </MainView>
      )
    } else {
      return <NoTreatments addBtnOnPress={() => navigation.navigate('NewTreatment', { patient: patient })} />
    }
  }

  return <MainView>{getTreatmentsContentView()}</MainView>
}
