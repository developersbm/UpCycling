// navigation/mainContainer.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountScreen from './screens/user/AccountScreen';
import SocialScreen from './screens/SocialScreen';
import PlayListStack from './PlayListStack';

const playListName = "PlayList";
const AccountName = "Account";
const socialName = "Social";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={socialName} // Set the initial route to SocialScreen
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === socialName) {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === playListName) {
            iconName = focused ? 'albums' : 'albums-outline'; // Correct icon name
          } else if (route.name === AccountName) {
            iconName = focused ? 'person' : 'person-outline'; // Use 'person' for the account icon
          }
          return <Ionicons name={iconName} size={size} color={color} style={{ marginTop: -5 }} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: { paddingTop: 2, fontSize: 15, marginBottom: 10 },
        tabBarStyle: { padding: 10, height: 70, paddingBottom: 10 },
        headerShown: false
      })}
    >
      <Tab.Screen name={socialName} component={SocialScreen} />
      <Tab.Screen name={playListName} component={PlayListStack} /> 
      <Tab.Screen name={AccountName} component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default MainContainer;
