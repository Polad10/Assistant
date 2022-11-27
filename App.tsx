import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { Text, useColorScheme, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import IonIcons from '@expo/vector-icons/Ionicons';
import Clients from './components/Clients';
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
          name='Clients'
          component={Clients}
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
