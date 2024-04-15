import { DeviceEventEmitter, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native'
import MyInput from './MyInput'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RootStackParamList, RootStackScreenProps } from '../types/Navigation'
import MainView from './MainView'
import { getPatientFullName } from '../helpers/PatientHelper'
import { Patient } from '../models/Patient'
import HeaderButton from './HeaderButton'
import { Treatment, TreatmentRequest } from '../models/Treatment'
import { DateTime } from 'luxon'
import { DataContext } from '../contexts/DataContext'
import { useNavigation } from '@react-navigation/native'
import TouchableInput from './TouchableInput'
import TouchableWithoutFeedbackInput from './TouchableWithoutFeedbackInput'
import DateInput, { DateInputRefType } from './DateInput'
import CreateButton from './CreateButton'
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView'
import { FontAwesome6 } from '@expo/vector-icons'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { showDangerMessage } from '../helpers/ToastHelper'
import Toast from 'react-native-root-toast'
import { LocalizationContext } from '../contexts/LocalizationContext'

type StyleProps = {
  patientEditable: boolean
  themeContext: ThemeContextType
}

type Props = {
  pageName: keyof RootStackParamList
  patient?: Patient
  treatment?: Treatment
}

export default function TreatmentForm(props: Props) {
  const navigation = useNavigation<RootStackScreenProps<typeof props.pageName>['navigation']>()
  const dataContext = useContext(DataContext)!
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!

  const translator = localizationContext.translator

  const [showPatientInputError, setShowPatientInputError] = useState(false)
  const [showTitleInputError, setShowTitleInputError] = useState(false)
  const [showPriceInputError, setShowPriceInputError] = useState(false)
  const [showStartDatePickerError, setShowStartDatePickerError] = useState(false)

  let startDateInitialVal = undefined
  let endDateInitialVal = undefined

  let patient = props.patient

  if (props.treatment) {
    patient = dataContext.patients?.find((p) => p.id === props.treatment?.patient_id)
    startDateInitialVal = new Date(props.treatment.start_date)

    if (props.treatment.end_date) {
      endDateInitialVal = new Date(props.treatment.end_date)
    }
  }

  const [selectedPatient, setSelectedPatient] = useState(patient)
  const [title, setTitle] = useState(props.treatment?.title)
  const [price, setPrice] = useState(props.treatment?.price.toString())

  const startDateInputRef = useRef<DateInputRefType>()
  const endDateInputRef = useRef<DateInputRefType>()

  let styleProps: StyleProps = {
    patientEditable: !patient,
    themeContext: themeContext,
  }

  const handleSave = useCallback(async () => {
    if (validate()) {
      const startDate = startDateInputRef.current?.getDate()
      const endDate = endDateInputRef.current?.getDate()

      const newTreatmentRequest: TreatmentRequest = {
        start_date: DateTime.fromJSDate(startDate!).toISODate()!,
        end_date: endDate ? DateTime.fromJSDate(endDate).toISODate() : null,
        title: title!,
        patient_id: selectedPatient!.id,
        price: Number(price),
      }

      if (props.treatment) {
        newTreatmentRequest.id = props.treatment.id
      }

      DeviceEventEmitter.emit('treatmentSaved', newTreatmentRequest)
    } else {
      showDangerMessage(translator.translate('fillInAllRequiredFields'), Toast.positions.TOP)
    }
  }, [selectedPatient, title, price])

  function validate() {
    let valid = true

    const startDate = startDateInputRef.current?.getDate()

    if (!startDate) {
      valid = false
      setShowStartDatePickerError(true)
    }

    if (!selectedPatient) {
      valid = false
      setShowPatientInputError(true)
    }

    if (!title) {
      valid = false
      setShowTitleInputError(true)
    }

    if (!price || isNaN(Number(price))) {
      valid = false
      setShowPriceInputError(true)
    }

    return valid
  }

  useEffect(() => {
    if (props.treatment) {
      navigation.setOptions({
        headerRight: () => <HeaderButton title={translator.translate('save')} onPress={handleSave} />,
      })
    }
  }, [navigation, handleSave])

  useEffect(() => {
    const patientSelectListener = DeviceEventEmitter.addListener('patientSelected', handlePatientSelect)
    const patientCreatedListener = DeviceEventEmitter.addListener('patientCreated', handlePatientSelect)

    return () => {
      patientSelectListener.remove()
      patientCreatedListener.remove()
    }
  }, [])

  function getSelectedPatientFullName() {
    return selectedPatient ? getPatientFullName(selectedPatient) : ''
  }

  function handleTitleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowTitleInputError(false)
    setTitle(event.nativeEvent.text)
  }

  function handlePriceChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setShowPriceInputError(false)
    setPrice(event.nativeEvent.text.replace(',', '.'))
  }

  function handlePatientSelect(patient: Patient) {
    // first navigate, then set patient
    // avoids reseting patient
    navigation.navigate('NewTreatment')

    setShowPatientInputError(false)
    setSelectedPatient(patient)
  }

  function handlePatientChange() {
    if (styleProps.patientEditable) {
      navigation.navigate('Patients', { pageName: 'NewTreatment' })
    }
  }

  return (
    <MainView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <MyKeyboardAvoidingView>
        <MainView>
          <View style={{ flexDirection: 'row' }}>
            <DateInput
              ref={startDateInputRef}
              style={{ flex: 1, marginRight: 5 }}
              label={translator.translate('startDate')}
              placeholder={DateTime.local().toISODate() ?? undefined}
              date={startDateInitialVal}
              showError={showStartDatePickerError}
              onChange={() => setShowStartDatePickerError(false)}
            />
            <DateInput
              ref={endDateInputRef}
              style={{ flex: 1, marginLeft: 5 }}
              label={translator.translate('endDate')}
              placeholder={DateTime.local().plus({ month: 1 }).toISODate() ?? undefined}
              date={endDateInitialVal}
            />
          </View>
          <MyInput
            label={translator.translate('title')}
            placeholder={translator.translate('enterTitle')}
            value={title}
            showError={showTitleInputError}
            onChange={handleTitleChange}
          />
          <MyInput
            label={translator.translate('price')}
            placeholder={translator.translate('enterAmount')}
            value={price}
            showError={showPriceInputError}
            onChange={handlePriceChange}
            keyboardType='decimal-pad'
            rightIcon={<FontAwesome6 name='manat-sign' color={themeContext.neutral} size={20} />}
          />
          {styleProps.patientEditable ? (
            <TouchableInput
              onPress={handlePatientChange}
              label={translator.translate('patient')}
              placeholder={translator.translate('selectPatient')}
              value={getSelectedPatientFullName()}
              showError={showPatientInputError}
            />
          ) : (
            <TouchableWithoutFeedbackInput
              label={translator.translate('patient')}
              placeholder={translator.translate('selectPatient')}
              value={getSelectedPatientFullName()}
              showError={showPatientInputError}
            />
          )}
        </MainView>
      </MyKeyboardAvoidingView>
      {!props.treatment && <CreateButton onPress={handleSave} />}
    </MainView>
  )
}
