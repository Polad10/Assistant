import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { useColorScheme, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import IonIcons from '@expo/vector-icons/Ionicons';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import NewAppointment from './components/NewAppointment';
import NewPatient from './components/NewPatient';
import Treatments from './components/Treatments';
import NewTreatment from './components/NewTreatment';

type Tabs = {
  Appointments: undefined;
  Patients: undefined;
};

const Tab = createBottomTabNavigator<Tabs>();
const Stack = createStackNavigator();

function Home() {
  const { colors } = useTheme();

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
  );
}

function SaveHeaderButton() {
  const { colors } = useTheme();

  return <Button title='Save' color={colors.primary} />;
}

export default function App() {
  DarkTheme.colors.primary = '#ad164d';

  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerRightContainerStyle: styles.headerRightContainer,
          headerLeftContainerStyle: styles.headerLeftContainer,
        }}
      >
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='New Appointment' component={NewAppointment} options={{ headerRight: SaveHeaderButton }} />
          <Stack.Screen name='Treatments' component={Treatments} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='New Patient' component={NewPatient} options={{ headerRight: SaveHeaderButton }} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='New Treatment' component={NewTreatment} options={{ headerRight: SaveHeaderButton }} />
          <Stack.Screen name='Patients' component={Patients} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    paddingRight: 5,
  },
  headerLeftContainer: {
    paddingLeft: 5,
  },
});
