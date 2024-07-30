import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './/screens/HomeScreen.js'
import PlayListScreen from './/screens/PlaylistScreen.js';
import SocialScreen from './/screens/SocialScreen.js';
import AccountScreen from './/screens/AccountScreen.js';

const homeName = "Home";
const PlayListScreen = "PlayList";
const SocialScreen = "Posts";
const AccountScreen = "Account";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={SocialScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size, marginTop }) => {
          let iconName;
          if (route.name === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === PlayListScreen) {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === SocialScreen) {
            iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
          } else if (route.name === AccountScreen) {
            iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} marginTop={marginTop} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'black',
        labelStyle: { paddingTop: 5, fontSize: 15, marginTop: -13 },
        style: { padding: 10, height: 200, paddingBottom: 30 }
      }}
    >
      <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name={PlayListScreen} component={PlayListScreen} options={{ headerShown: false }} />
      <Tab.Screen name={SocialScreen} component={SocialScreen} options={{ headerShown: false }} />
      <Tab.Screen name={AccountScreen} component={AccountScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default MainContainer;