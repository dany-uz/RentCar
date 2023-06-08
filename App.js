import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Import the screens
import LoginForm from './screens/signin';
import RegistrationForm from './screens/signup';
import ForgotPasswordForm from './screens/forgotpassword';
import RentForm from './screens/rentcar';
import ReturnCarForm from './screens/returncar';
import Cars from './screens/cars';
import HomeScreen from './screens/test';

// Import React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Import Icon from Ionicons
import { Ionicons } from '@expo/vector-icons';

// Import FlashMessage
import FlashMessage from "react-native-flash-message";

// Create the navigator
const Tab = createBottomTabNavigator();

// Create the navigator
const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set the icon based on the tab route
          if (route.name === 'Ingresar') {
            iconName = 'ios-log-in';
          } else if (route.name === 'Registrarse') {
            iconName = 'ios-person-add';
          } else if (route.name === 'Rentar') {
            iconName = 'ios-wallet';
          } else if (route.name === 'Devolver') {
            iconName = 'ios-car-sport';
          } else if (route.name === 'Reestablecer') {
            iconName = 'ios-lock-closed';
          } else if (route.name === 'Carros') {
            iconName = 'ios-car';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#2e64e5',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Ingresar" component={LoginForm} />
      <Tab.Screen name="Registrarse" component={RegistrationForm} />
      <Tab.Screen name="Reestablecer" component={ForgotPasswordForm} />
      <Tab.Screen name="Carros" component={Cars} />
      <Tab.Screen name="Rentar" component={RentForm} />
      <Tab.Screen name="Devolver" component={ReturnCarForm} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <FlashMessage position="top" />
      <AppTabs />
    </NavigationContainer>
  );
}

export default App;