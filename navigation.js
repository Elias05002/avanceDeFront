import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import EventDetailsScreen from './src/frontend/screens/EventDetailsScreen';
import HomeScreen from './src/frontend/screens/HomeScreen'; // Ajusta la ruta según tu estructura de proyecto
import LoginScreen from './src/frontend/screens/LoginScreen';
import RegisterScreen from './src/frontend/screens/RegisterScreen';
import GamesScreen from './src/frontend/screens/GamesScreen';
import ClienteUser from './src/frontend/screens/ClienteUser';
import Administradores from './src/frontend/screens/Administradores';
import Empleado from './src/frontend/screens/Empleado';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen 
        name="home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen 
        name="register" 
        component={RegisterScreen} 
        options={{
          tabBarLabel: 'Register',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
     
     <Tab.Screen 
        name="login" 
        component={LoginScreen} 
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="games" 
        component={GamesScreen} 
        options={{
          tabBarLabel: 'games',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gamepad-variant" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />


        <Tab.Screen 
        name="ClienteUser" 
        component={ClienteUser} 
        options={{
          tabBarLabel: 'Clientes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-box-multiple-outline" size={24} color={color} />
          ), 
          headerShown: false,
        }}
      />

<Tab.Screen 
        name="Administradores" 
        component={Administradores} 
        options={{
          tabBarLabel: 'Administradores',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-cog" size={24} color={color} />
          ), 
          headerShown: false,
        }}
      />

<Tab.Screen 
        name="Empleado" 
        component={Empleado} 
        options={{
          tabBarLabel: 'Empleado',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-tie" size={24} color={color} />
          ), 
          headerShown: false,
        }}
      />

    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

// <Tab.Screen 
//   name="EventDetailsScreen" 
//   component={EventDetailsScreen} 
//   options={{
//     tabBarLabel: 'Detalles',
//     tabBarIcon: ({ color, size }) => (
//       <MaterialCommunityIcons name="eye-settings" size={24} color={color} />
//     ), 
//     headerShown: false,
//   }}
// />
