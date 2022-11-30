import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme, StackActions, useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import IonIcons from '@expo/vector-icons/Ionicons';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import NewAppointment from './components/NewAppointment';

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

export default function App() {
  DarkTheme.colors.primary = '#ad164d';

  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='NewAppointment' component={NewAppointment} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
