import React from 'react';
import { View, Image, Text } from 'react-native';
import ProfilePicture from '../ProfilePicture';


const LeftContainer = ({pfp}) => (
  <View>
     <ProfilePicture profile={pfp} size={75} />
  </View>
)


export default LeftContainer;
