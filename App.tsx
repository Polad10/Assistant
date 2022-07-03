import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { Text, useColorScheme, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import IonIcons from '@expo/vector-icons/Ionicons';

type Tabs = {
  Appointments: undefined;
  Clients: undefined;
};

const Tab = createBottomTabNavigator<Tabs>();

function Appointments() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text }}>Appointments</Text>
    </View>
  );
}

function Clients() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text }}>Clients</Text>
    </View>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const { colors } = useTheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
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
