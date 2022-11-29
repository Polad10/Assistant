import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import IonIcons from '@expo/vector-icons/Ionicons';
import Patients from './components/Patients';
import Appointments from './components/Appointments';

type Tabs = {
  Appointments: undefined;
  Clients: undefined;
};

const Tab = createBottomTabNavigator<Tabs>();

export default function App() {
  DarkTheme.colors.primary = '#ad164d';

  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const { colors } = theme;

  return (
    <NavigationContainer theme={theme}>
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
    </NavigationContainer>
  );
}
