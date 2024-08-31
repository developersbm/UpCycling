import React from 'react';
import { StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Amplify } from "aws-amplify";
import MainContainer from './navigation/mainContainer';
import { LoginScreen } from './navigation/screens/authentication/LoginScreen';
import { SignupScreen } from './navigation/screens/authentication/SignupScreen';
import ForgotPasswordScreen from './navigation/screens/authentication/ForgotPasswordScreen';
import VerificationScreen from './navigation/screens/authentication/VerificationScreen';
import SplashScreen from './navigation/screens/SplashScreen';
import NewPasswordScreen from './navigation/screens/authentication/NewPasswordScreen';
import UserMenu from './components/UserMenu';
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import logo from '../frontend/assets/icons/logo2.png';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
console.log('Amplify:', Amplify); // Debugging

const Stack = createStackNavigator();
// Change this in the future
const AuthenticatedStack = () => (
  <Stack.Navigator initialRouteName="MainContainer" >
    <Stack.Screen
      name="MainContainer"
      component={MainContainer}
      options={{
        headerTitle: 'Feed',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20, 
        },
        headerLeft: () => (
          <Image source={logo} style={{ width: 160, height: 70, resizeMode: 'cover', marginTop: -20, marginLeft: 15 }} />
        ),
        headerRight: () => <UserMenu />,
        headerStyle: {
          height: 100,
        }
      }}
    />
  </Stack.Navigator>
);

const UnauthenticatedStack = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="MainContainer"
      component={MainContainer}
      options={{
        headerTitle: 'Feed',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20, 
        },
        headerLeft: () => (
          <Image source={logo} style={{ width: 160, height: 70, resizeMode: 'cover', marginTop: -20, marginLeft: 15 }} />
        ),
        headerRight: () => <UserMenu />,
        headerStyle: {
          height: 100,
        }
      }}
    />
  </Stack.Navigator>
);

// Change to unauthenticated if you want to access MainContainer (Needs to be fixed)
const RootNavigator = () => {
  const { authStatus } = useAuthenticator();

  return (
    <NavigationContainer>
      {authStatus === 'authenticated' ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
};

const App = () => (
  <Authenticator.Provider>
    <StatusBar hidden={true} />
    <RootNavigator />
  </Authenticator.Provider>
);

export default App;
