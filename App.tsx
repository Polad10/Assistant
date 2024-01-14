import 'react-native-gesture-handler'
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native'
import { useColorScheme, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import IonIcons from '@expo/vector-icons/Ionicons'
import Patients from './components/Patients'
import Appointments from './components/Appointments'
import NewAppointment from './components/NewAppointment'
import NewPatient from './components/NewPatient'
import Treatments from './components/Treatments'
import NewTreatment from './components/NewTreatment'
import EditAppointment from './components/EditAppointment'
import { useFonts } from 'expo-font'
import type { RootStackParamList } from './types/Navigation'
import Patient from './components/Patient'
import Treatment from './components/Treatment'
import NewPayment from './components/NewPayment'
import DataProvider from './providers/DataProvider'
import EditPatient from './components/EditPatient'
import EditTreatment from './components/EditTreatment'
import EditPayment from './components/EditPayment'
import { RootSiblingParent } from 'react-native-root-siblings'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

type Tabs = {
  Appointments: undefined
  Patients: undefined
}

const Tab = createBottomTabNavigator<Tabs>()
const Stack = createStackNavigator<RootStackParamList>()

function Home() {
  const { colors } = useTheme()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Appointments'
        component={Appointments}
        options={{
          tabBarIcon: (props) => (
            <IonIcons name='calendar-outline' size={25} color={props.focused ? colors.primary : 'grey'} />
          ),
          tabBarActiveTintColor: colors.primary,
          title: 'Agenda',
          headerTitle: 'AGENDA',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Tab.Screen
        name='Patients'
        component={Patients}
        options={{
          tabBarIcon: (props) => (
            <IonIcons name='people-outline' size={25} color={props.focused ? colors.primary : 'grey'} />
          ),
          tabBarActiveTintColor: colors.primary,
          headerTitle: 'PATIENTS',
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  DarkTheme.colors.primary = '#ad164d'

  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <RootSiblingParent>
      <ActionSheetProvider>
        <DataProvider>
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              screenOptions={{
                headerRightContainerStyle: styles.headerRightContainer,
                headerLeftContainerStyle: styles.headerLeftContainer,
                headerBackTitle: 'Back',
              }}
            >
              <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
              <Stack.Group screenOptions={{ presentation: 'modal', headerTitleStyle: styles.headerTitle }}>
                <Stack.Screen name='Patients' component={Patients} options={{ headerTitle: 'PATIENTS' }} />
                <Stack.Screen name='Treatments' component={Treatments} options={{ headerTitle: 'TREATMENTS' }} />
                <Stack.Screen name='Patient' component={Patient} options={{ headerTitle: 'PATIENT' }} />
                <Stack.Screen name='Treatment' component={Treatment} options={{ headerTitle: 'TREATMENT' }} />
                <Stack.Screen
                  name='NewAppointment'
                  component={NewAppointment}
                  options={{ headerTitle: 'APPOINTMENT' }}
                />
                <Stack.Screen name='NewTreatment' component={NewTreatment} options={{ headerTitle: 'TREATMENT' }} />
                <Stack.Screen name='NewPatient' component={NewPatient} options={{ headerTitle: 'PATIENT' }} />
                <Stack.Screen
                  name='EditAppointment'
                  component={EditAppointment}
                  options={{ headerTitle: 'APPOINTMENT' }}
                />
                <Stack.Screen name='EditPatient' component={EditPatient} options={{ headerTitle: 'PATIENT' }} />
                <Stack.Screen name='EditTreatment' component={EditTreatment} options={{ headerTitle: 'TREATMENT' }} />
                <Stack.Screen name='EditPayment' component={EditPayment} options={{ headerTitle: 'PAYMENT' }} />
                <Stack.Screen name='NewPayment' component={NewPayment} options={{ headerTitle: 'PAYMENT' }} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </DataProvider>
      </ActionSheetProvider>
    </RootSiblingParent>
  )
}

const styles = StyleSheet.create({
  headerRightContainer: {
    paddingRight: 5,
  },
  headerLeftContainer: {
    paddingLeft: 5,
  },
  headerTitle: {
    letterSpacing: 1,
  },
})
