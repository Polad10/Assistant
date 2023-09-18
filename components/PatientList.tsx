import { View } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import PatientListSection from './PatientListSection'

type Props = {
  pageName: keyof RootStackParamList
  preventDefault?: boolean
  patients: Patient[]
}

export default function PatientList(props: Props) {
  const groupedPatients = new Map<string, Patient[]>()

  for (const patient of props.patients) {
    const firstChar = patient.first_name.charAt(0).toUpperCase()

    if (!groupedPatients.has(firstChar)) {
      groupedPatients.set(firstChar, [])
    }

    groupedPatients.get(firstChar)?.push(patient)
  }

  const patientListSections = [...groupedPatients].sort().map(([key, value]) => {
    return (
      <PatientListSection
        key={key}
        sectionTiTle={key}
        patients={value}
        preventDefault={props.preventDefault}
        pageName={props.pageName}
      />
    )
  })

  return <View>{patientListSections}</View>
}
