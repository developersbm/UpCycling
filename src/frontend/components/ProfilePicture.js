import React from 'react';
import { Image } from 'react-native';


const ProfilePicture = ({profile}) => (
  <Image
  source={{ uri: profile || '' }}
  style={{
      width: 50,
      height: 50,
      borderRadius: 50
    }}
  />
)


export default ProfilePicture;