import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import IonIcons from '@expo/vector-icons/Ionicons'
import Patients from './components/Patients'
import Appointments from './components/Appointments'
import NewAppointment from './components/NewAppointment'
import NewPatient from './components/NewPatient'
import Treatments from './components/Treatments'
import NewTreatment from './components/NewTreatment'
import EditAppointment from './components/EditAppointment'
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
import ThemeProvider from './providers/ThemeProvider'
import { ThemeContext } from './contexts/ThemeContext'
import { StyleSheet } from 'react-native'
import Settings from './components/Settings'
import Languages from './components/Languages'
import { translate } from './helpers/Translator'

type Tabs = {
  Appointments: undefined
  Patients: undefined
  Settings: undefined
}

const Tab = createBottomTabNavigator<Tabs>()
const Stack = createStackNavigator<RootStackParamList>()

function Home() {
  const themeContext = useContext(ThemeContext)!

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Appointments'
        component={Appointments}
        options={{
          tabBarIcon: (props) => (
            <IonIcons name='calendar-outline' size={25} color={props.focused ? themeContext.accent : 'grey'} />
          ),
          tabBarActiveTintColor: themeContext.accent,
          tabBarStyle: { backgroundColor: themeContext.primary },
          title: translate('agenda'),
          headerTitle: translate('agenda').toUpperCase(),
          headerTitleStyle: [styles.headerTitle, { color: themeContext.neutral }],
          headerStyle: { backgroundColor: themeContext.primary },
        }}
      />
      <Tab.Screen
        name='Patients'
        component={Patients}
        options={{
          tabBarIcon: (props) => (
            <IonIcons name='people-outline' size={25} color={props.focused ? themeContext.accent : 'grey'} />
          ),
          tabBarActiveTintColor: themeContext.accent,
          tabBarStyle: { backgroundColor: themeContext.primary },
          title: translate('patients'),
          headerTitle: translate('patients').toUpperCase(),
          headerTitleStyle: [styles.headerTitle, { color: themeContext.neutral }],
          headerStyle: { backgroundColor: themeContext.primary },
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: (props) => (
            <IonIcons name='cog-outline' size={25} color={props.focused ? themeContext.accent : 'grey'} />
          ),
          tabBarActiveTintColor: themeContext.accent,
          tabBarStyle: { backgroundColor: themeContext.primary },
          title: translate('settings'),
          headerTitle: translate('settings').toUpperCase(),
          headerTitleStyle: [styles.headerTitle, { color: themeContext.neutral }],
          headerStyle: { backgroundColor: themeContext.primary },
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <RootSiblingParent>
      <ActionSheetProvider>
        <DataProvider>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </DataProvider>
      </ActionSheetProvider>
    </RootSiblingParent>
  )
}

function Navigation() {
  const themeContext = useContext(ThemeContext)!

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRightContainerStyle: styles.headerRightContainer,
          headerLeftContainerStyle: styles.headerLeftContainer,
          headerBackTitle: translate('back'),
          headerBackTitleStyle: { color: themeContext.accent },
          headerStyle: { backgroundColor: themeContext.primary },
          headerTintColor: themeContext.accent,
        }}
      >
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            headerTitleStyle: [styles.headerTitle, { color: themeContext.neutral }],
          }}
        >
          <Stack.Screen
            name='Patients'
            component={Patients}
            options={{ headerTitle: translate('patients').toUpperCase() }}
          />
          <Stack.Screen
            name='Treatments'
            component={Treatments}
            options={{ headerTitle: translate('treatments').toUpperCase() }}
          />
          <Stack.Screen
            name='Patient'
            component={Patient}
            options={{ headerTitle: translate('patient').toUpperCase() }}
          />
          <Stack.Screen
            name='Treatment'
            component={Treatment}
            options={{ headerTitle: translate('treatment').toUpperCase() }}
          />
          <Stack.Screen
            name='NewAppointment'
            component={NewAppointment}
            options={{ headerTitle: translate('appointment').toUpperCase() }}
          />
          <Stack.Screen
            name='NewTreatment'
            component={NewTreatment}
            options={{ headerTitle: translate('treatment').toUpperCase() }}
          />
          <Stack.Screen
            name='NewPatient'
            component={NewPatient}
            options={{ headerTitle: translate('patient').toUpperCase() }}
          />
          <Stack.Screen
            name='EditAppointment'
            component={EditAppointment}
            options={{ headerTitle: translate('appointment').toUpperCase() }}
          />
          <Stack.Screen
            name='EditPatient'
            component={EditPatient}
            options={{ headerTitle: translate('patient').toUpperCase() }}
          />
          <Stack.Screen
            name='EditTreatment'
            component={EditTreatment}
            options={{ headerTitle: translate('treatment').toUpperCase() }}
          />
          <Stack.Screen
            name='EditPayment'
            component={EditPayment}
            options={{ headerTitle: translate('payment').toUpperCase() }}
          />
          <Stack.Screen
            name='NewPayment'
            component={NewPayment}
            options={{ headerTitle: translate('payment').toUpperCase() }}
          />
          <Stack.Screen
            name='Languages'
            component={Languages}
            options={{ headerTitle: translate('languages').toUpperCase() }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
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
