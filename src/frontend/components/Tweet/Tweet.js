import React from 'react';
import { View, StyleSheet } from 'react-native';
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";


const Tweet = ({ tweet }) => (
  <View style={styles.container}>
     <LeftContainer pfp = {tweet.image} />
     <MainContainer tweet={tweet} />
  </View>
)


export default Tweet;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
    }
    });
