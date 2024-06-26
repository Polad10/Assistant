import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { RootStackScreenProps } from '../types/Navigation'
import DetailTab from './DetailTab'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import MyFAB from './MyFAB'
import PaymentList from './PaymentList'
import { DataContext } from '../contexts/DataContext'
import { getPatientFullName } from '../helpers/PatientHelper'
import { getAgendaItems, getGroupedAppointments } from '../helpers/AppointmentHelper'
import { Status } from '../enums/Status'
import MainView from './MainView'
import MyAgendaList from './MyAgendaList'
import HeaderButton from './HeaderButton'
import { treatmentFinished } from '../helpers/TreatmentHelper'
import MyButtonGroup from './MyButtonGroup'
import { Button, Chip, Overlay } from '@rneui/themed'
import IonIcons from '@expo/vector-icons/Ionicons'
import TreatmentInfo from './TreatmentInfo'
import { getTreatmentPayments } from '../helpers/PaymentHelper'
import NoPayments from './user-messages/NoPayments'
import NoAppointments from './user-messages/NoAppointments'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { TranslationKeys } from '../localization/TranslationKeys'
import NoAlbums from './user-messages/NoAlbums'
import MyInput from './MyInput'
import { Divider } from '@rneui/base'
import { AlbumRequest } from '../models/Album'
import { ToastContext } from '../contexts/ToastContext'
import AlbumIllustration from './illustrations/AlbumIllustration'
import { TouchableOpacity } from 'react-native-gesture-handler'

type StyleProps = {
  themeContext: ThemeContextType
  treatmentFinished: boolean | undefined
}

export default function Treatment() {
  const navigation = useNavigation<RootStackScreenProps<'Treatment'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'Treatment'>['route']>()

  const dataContext = useContext(DataContext)!
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!

  const translator = localizationContext.translator
  const { treatmentId } = route.params

  const toast = toastContext.toast!

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [newAlbumTitle, setNewAlbumTitle] = useState('')
  const [newAlbumSaveDisabled, setNewAlbumSaveDisabled] = useState(true)
  const [albumTitlePromptVisible, setAlbumTitlePromptVisible] = useState(false)

  function handleEdit() {
    navigation.navigate('EditTreatment', { treatmentId: treatmentId })
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title={translator.translate('edit')} onPress={handleEdit} />,
    })
  }, [])

  const treatment = dataContext.treatments?.find((t) => t.id === treatmentId)

  if (!treatment) {
    return
  }

  const patient = dataContext.patients?.find((p) => p.id === treatment?.patient_id)
  const appointments = dataContext.appointments?.filter((a) => a.treatment_id === treatment?.id) ?? []
  const payments = getTreatmentPayments(dataContext.payments ?? [], treatment.id)
  const albums = dataContext.albums?.filter((a) => a.treatment_id === treatment.id) ?? []

  const groupedAppointments = getGroupedAppointments(appointments, true) ?? new Map()
  const agendaItems = getAgendaItems(groupedAppointments)

  const styleProps: StyleProps = {
    themeContext: themeContext,
    treatmentFinished: treatmentFinished(treatment),
  }

  const albumElements = albums.map((a) => (
    <TouchableOpacity key={a.id}>
      <View
        style={{
          backgroundColor: themeContext.secondary,
          padding: 10,
          borderRadius: 20,
        }}
      >
        <AlbumIllustration />
      </View>
      <Text
        style={{
          color: themeContext.neutral,
          textAlign: 'center',
          marginTop: 5,
          fontSize: 20,
        }}
      >
        {a.title}
      </Text>
    </TouchableOpacity>
  ))

  function handleNewAlbumTextChange(val: string) {
    setNewAlbumTitle(val)

    if (val) {
      setNewAlbumSaveDisabled(false)
    } else {
      setNewAlbumSaveDisabled(true)
    }
  }

  function saveNewAlbum() {
    try {
      const newAlbum: AlbumRequest = { title: newAlbumTitle, treatment_id: treatmentId }
      dataContext.createAlbum(newAlbum)

      setAlbumTitlePromptVisible(false)
      toast.showSuccessMessage(translator.translate('albumAdded'))
    } catch (ex) {
      toast.showDangerMessage(translator.translate('somethingWentWrongMessage'))
    }
  }

  const buttons = [
    {
      element: () => (
        <DetailTab name='information-circle-outline' type='ionicon' index={0} selectedIndex={selectedIndex} />
      ),
    },
    {
      element: () => <DetailTab name='calendar-clear-outline' type='ionicon' index={1} selectedIndex={selectedIndex} />,
    },
    {
      element: () => <DetailTab name='cash-outline' type='ionicon' index={2} selectedIndex={selectedIndex} />,
    },
    {
      element: () => <DetailTab name='images-outline' type='ionicon' index={3} selectedIndex={selectedIndex} />,
    },
  ]

  const TabContent = () => {
    switch (selectedIndex) {
      case 0:
        return <TreatmentInfo treatment={treatment} />
      case 1:
        if (agendaItems.length > 0) {
          return (
            <MainView>
              <MyAgendaList sections={agendaItems} pageName='Treatment' />
              <MyFAB onPress={() => navigation.navigate('NewAppointment', { treatment: treatment })} />
            </MainView>
          )
        } else {
          return (
            <NoAppointments addBtnOnPress={() => navigation.navigate('NewAppointment', { treatment: treatment })} />
          )
        }
      case 2:
        if (payments.length > 0) {
          return (
            <MainView>
              <PaymentList pageName='Treatment' payments={payments} />
              <MyFAB onPress={() => navigation.navigate('NewPayment', { treatmentId: treatment.id })} />
            </MainView>
          )
        } else {
          return <NoPayments addBtnOnPress={() => navigation.navigate('NewPayment', { treatmentId: treatment.id })} />
        }
      case 3:
        if (albums.length > 0) {
          return (
            <MainView>
              <ScrollView>
                <MainView
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    rowGap: 20,
                    columnGap: 20,
                    padding: 10,
                  }}
                >
                  {albumElements}
                </MainView>
              </ScrollView>
              <MyFAB onPress={() => setAlbumTitlePromptVisible(true)} />
            </MainView>
          )
        } else {
          return <NoAlbums addBtnOnPress={() => setAlbumTitlePromptVisible(true)} />
        }
      default:
        return null
    }
  }

  const status = styleProps.treatmentFinished ? Status.FINISHED : Status.ONGOING

  return (
    <MainView>
      <View style={[styles(styleProps).headerView, styles(styleProps).card]}>
        <Text style={styles(styleProps).title}>{treatment.title}</Text>
        <View style={styles(styleProps).statusView}>
          <Chip
            title={translator.translate(status.toLowerCase() as keyof TranslationKeys)}
            type='outline'
            titleStyle={styles(styleProps).status}
            buttonStyle={styles(styleProps).statusButton}
          />
        </View>
      </View>
      <View style={styles(styleProps).card}>
        <View style={styles(styleProps).infoField}>
          <IonIcons name='person-outline' size={22} style={styles(styleProps).infoIcon} />
          <Text style={styles(styleProps).text}>{getPatientFullName(patient)}</Text>
        </View>
      </View>
      <MyButtonGroup buttons={buttons} selectedIndex={selectedIndex} onPress={(value) => setSelectedIndex(value)} />
      <View style={styles(styleProps).additionalInfoView}>
        <TabContent />
        <Overlay
          isVisible={albumTitlePromptVisible}
          onBackdropPress={() => setAlbumTitlePromptVisible(false)}
          overlayStyle={{ width: '70%', borderRadius: 20, backgroundColor: themeContext.primary, bottom: 100 }}
          backdropStyle={{ opacity: 0.8, backgroundColor: 'black' }}
        >
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: themeContext.neutral, marginBottom: 5 }}>
              {translator.translate('newAlbum')}
            </Text>
            <Text style={{ color: themeContext.neutral }}>{translator.translate('enterAlbumName')}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <MyInput
              style={{ paddingVertical: 0, paddingTop: 0 }}
              placeholder={translator.translate('title')}
              autoFocus={true}
              onChangeText={handleNewAlbumTextChange}
            />
          </View>
          <Divider color={themeContext.border} />
          <View style={{ flexDirection: 'row' }}>
            <Button
              containerStyle={{ flex: 1 }}
              titleStyle={{ fontWeight: 'bold', color: themeContext.accent }}
              type='clear'
              onPress={() => setAlbumTitlePromptVisible(false)}
            >
              {translator.translate('cancel')}
            </Button>
            <Divider color={themeContext.border} orientation='vertical' />
            <Button
              containerStyle={{ flex: 1 }}
              titleStyle={{ color: themeContext.accent }}
              type='clear'
              disabled={newAlbumSaveDisabled}
              onPress={saveNewAlbum}
            >
              {translator.translate('save')}
            </Button>
          </View>
        </Overlay>
      </View>
    </MainView>
  )
}

const styles = (styleProps: StyleProps) =>
  StyleSheet.create({
    headerView: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoField: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    infoIcon: {
      color: styleProps.themeContext.neutral,
      opacity: 0.5,
      marginRight: 10,
    },
    additionalInfoView: {
      flex: 1,
    },
    title: {
      color: styleProps.themeContext.neutral,
      fontSize: 25,
    },
    text: {
      color: styleProps.themeContext.neutral,
      fontSize: 20,
    },
    card: {
      backgroundColor: styleProps.themeContext.secondary,
      padding: 20,
      marginTop: 5,
    },
    statusView: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-end',
    },
    status: {
      color: styleProps.treatmentFinished ? 'lightgreen' : 'orange',
    },
    statusButton: {
      borderColor: styleProps.treatmentFinished ? 'lightgreen' : 'orange',
    },
  })
