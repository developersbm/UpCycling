// navigation/screens/InsidePLScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InsidePLScreen = ({ route }) => {
  const { img, title, ingredients } = route.params;
  const navigation = useNavigation();

  const handleChatbotPress = () => {
    navigation.navigate('ChatbotScreen');
  };

  const handleCameraPress = () => {
    navigation.navigate('CameraScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={img} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title2}>Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredient}>
              <Image source={ingredient.img} style={styles.ingredientImage} />
              <Text style={styles.ingredientTitle}>{ingredient.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChatbotPress}>
          <Ionicons name="chatbox-ellipses-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleCameraPress}>
          <Ionicons name="camera-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InsidePLScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  ingredientTitle: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  button2: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
});