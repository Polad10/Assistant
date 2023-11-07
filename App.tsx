import 'react-native-gesture-handler'
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native'
import { useColorScheme, Button, StyleSheet } from 'react-native'
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
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  DarkTheme.colors.primary = '#ad164d'

  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme

  useFonts({
    Fontello: require('./assets/fontello/font/fontello.ttf'),
  })

  return (
    <DataProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerRightContainerStyle: styles.headerRightContainer,
            headerLeftContainerStyle: styles.headerLeftContainer,
          }}
        >
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name='Patients' component={Patients} />
            <Stack.Screen name='Treatments' component={Treatments} />
            <Stack.Screen name='Patient' component={Patient} />
            <Stack.Screen name='Treatment' component={Treatment} />
            <Stack.Screen name='NewAppointment' component={NewAppointment} />
            <Stack.Screen name='NewTreatment' component={NewTreatment} />
            <Stack.Screen name='NewPatient' component={NewPatient} />
            <Stack.Screen name='EditAppointment' component={EditAppointment} />
            <Stack.Screen name='EditPatient' component={EditPatient} />
            <Stack.Screen name='EditTreatment' component={EditTreatment} />
            <Stack.Screen name='NewPayment' component={NewPayment} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  )
}

const styles = StyleSheet.create({
  headerRightContainer: {
    paddingRight: 5,
  },
  headerLeftContainer: {
    paddingLeft: 5,
  },
})
