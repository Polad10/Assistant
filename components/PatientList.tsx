import { RootStackParamList } from '../types/Navigation'
import PatientListSection from './PatientListSection'
import MainView from './MainView'
import { ScrollView } from 'react-native'
import { useContext, useEffect } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Patient } from '@polad10/assistant-models/Patient'

type Props = {
  pageName: keyof RootStackParamList
}

export default function PatientList(props: Props) {
  const context = useContext(DataContext)

  useEffect(() => {
    context!.fetchPatients()
  }, [])

  const groupedPatients = new Map<string, Patient[]>()

  for (const patient of context?.patients ?? []) {
    const firstChar = patient.first_name.charAt(0).toUpperCase()

    if (!groupedPatients.has(firstChar)) {
      groupedPatients.set(firstChar, [])
    }

    groupedPatients.get(firstChar)?.push(patient)
  }

  const patientListSections = [...groupedPatients].sort().map(([key, value]) => {
    return <PatientListSection key={key} sectionTiTle={key} patients={value} pageName={props.pageName} />
  })

  return (
    <ScrollView>
      <MainView>{patientListSections}</MainView>
    </ScrollView>
  )
}
