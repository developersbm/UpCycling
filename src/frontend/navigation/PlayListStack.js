// navigation/PlayListStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlaylistScreen from './screens/PlaylistScreen';
import InsidePLScreen from './screens/InsidePLScreen';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

function PlayListStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: { backgroundColor: '#fff' },
        headerTitle: '',
        headerShown: route.name === 'InsidePLScreen' ? true : false, // Only show header on InsidePLScreen
        headerLeft: route.name === 'InsidePLScreen' ? () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ) : null,
      })}
    >
      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Stack.Screen name="InsidePLScreen" component={InsidePLScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingLeft: 15,
  },
});

export default PlayListStack;
