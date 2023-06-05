import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Import the screens
import LoginForm from './screens/signin';
import RegistrationForm from './screens/signup';
import RentForm from './screens/rentcar';
import ForgotPasswordForm from './screens/forgotpassword';
import ReturnCarForm from './screens/returncar';

// Import React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Import Icon from Ionicons
import { Ionicons } from '@expo/vector-icons';

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
          if (route.name === 'Sign In') {
            iconName = 'ios-log-in';
          } else if (route.name === 'Sign Up') {
            iconName = 'ios-person-add';
          } else if (route.name === 'Rent Car') {
            iconName = 'ios-car';
          } else if (route.name === 'Return Car') {
            iconName = 'ios-car-sport';
          } else if (route.name === 'Forgot Password') {
            iconName = 'ios-help-circle';
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
      <Tab.Screen name="Sign In" component={LoginForm} />
      <Tab.Screen name="Sign Up" component={RegistrationForm} />
      <Tab.Screen name="Rent Car" component={RentForm} />
      <Tab.Screen name="Return Car" component={ReturnCarForm} />
      <Tab.Screen name="Forgot Password" component={ForgotPasswordForm} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}

export default App;