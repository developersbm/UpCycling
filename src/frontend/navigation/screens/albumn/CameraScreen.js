import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation }) {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const data = await cameraRef.current.takePictureAsync();
      setImage(data.uri);
    }
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const submitPicture = () => {
    if (image) {
      navigation.navigate('AiScreen', { imageURI: image });
    }
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          ref={cameraRef}
          onCameraReady={handleCameraReady}
        />
      ) : (
        <Image source={{ uri: image }} style={styles.preview} />
      )}

      <View style={styles.controls}>
        {image ? (
          <TouchableOpacity onPress={submitPicture}>
            <Text>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={takePicture}>
            <Text>Take Picture</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={openImagePicker}>
          <Text>Pick Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 5,
    borderRadius: 10,
  },
  preview: {
    flex: 5,
    borderRadius: 10,
  },
  controls: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});