// navigation/mainContainer.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreen from './screens/SearchScreen';
import SocialScreen from './screens/SocialScreen';
import PlayListStack from './PlayListStack';

const playListName = "PlayList";
const SearchName = "Search";
const socialName = "Social";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={playListName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === socialName) {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === SearchName) {
            iconName = focused ? 'search' : 'search-outline';
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
      <Tab.Screen name={SearchName} component={SearchScreen} />
      <Tab.Screen name={playListName} component={PlayListStack} /> 
    </Tab.Navigator>
  );
}

export default MainContainer;
