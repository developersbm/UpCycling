import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './navigation/mainContainer';
import { LoginScreen } from './navigation/screens/authentication/LoginScreen';
import { SignupScreen } from './navigation/screens/authentication/SignupScreen';
import SplashScreen from './navigation/screens/SplashScreen';
import UserMenu from './components/UserMenu';
import { Image } from 'react-native';
import logo from '../frontend/assets/icons/logo2.png';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import {withAuthenticator} from 'aws-amplify-react-native';
Amplify.configure(amplifyconfig);

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Splash"> 
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="MainContainer" 
            component={MainContainer} 
            options={
              {
                headerTitle: '', 
              headerLeft: () => (
                <Image source={logo}
                 style={{ width: 150, height: 60, resizeMode: 'cover' }}
      />
              ),
              headerRight: () => (
                <UserMenu />
              ),
              
            }}
          />
        </Stack.Navigator>
        
      </NavigationContainer>
    </>
  );
}
export default withAuthenticator(App);
// Cheat
// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();