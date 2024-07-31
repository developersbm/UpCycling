import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostScreen from './screens/PostScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import SocialScreen from './screens/SocialScreen';

const playListName = "PlayList";
const postName = "Post";
const socialName = "Social";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={playListName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // Define icon name based on the route
          let iconName;
          if (route.name === socialName) {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === postName) {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === playListName) {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
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
      <Tab.Screen name={postName} component={PostScreen} />
      <Tab.Screen name={playListName} component={PlaylistScreen} />
    </Tab.Navigator>
  );
}

export default MainContainer;
