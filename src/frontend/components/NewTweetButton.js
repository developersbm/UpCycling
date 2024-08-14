import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons} from "@expo/vector-icons";


const NewTweetButton = () => {


  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
    >
      <MaterialCommunityIcons name={"feather"} size={30} color="black" />
    </TouchableOpacity>
  )
}


export default NewTweetButton;


const styles = StyleSheet.create({
    button: {
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 60,
      height: 60,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
