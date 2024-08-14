import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Feed from '../../components/Feed';
import NewTweetButton from '../../components/NewTweetButton';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function HomeScreen() {
  return (
    <View style={styles.container}>
       <Feed />
      <NewTweetButton />
    </View>
  );
}
