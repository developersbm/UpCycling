import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlaylistScreen from './screens/PlaylistScreen';
import InsidePLScreen from './screens/albumn/InsidePLScreen';
import ChatbotScreen from './screens/albumn/ChatbotScreen';
import CameraScreen from './screens/albumn/CameraScreen';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

function PlayListStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: { backgroundColor: '#fff' },
        headerTitle: '',
        headerShown: route.name === 'InsidePLScreen' || route.name === 'ChatbotScreen' || route.name === 'CameraScreen' ? true : false,
        headerLeft: route.name === 'InsidePLScreen' || route.name === 'ChatbotScreen' || route.name === 'CameraScreen' ? () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ) : null,
      })}
    >
      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Stack.Screen name="InsidePLScreen" component={InsidePLScreen} />
      <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingLeft: 15,
  },
});

export default PlayListStack;
