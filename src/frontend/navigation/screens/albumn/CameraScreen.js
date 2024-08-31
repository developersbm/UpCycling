// navigation/screens/albumn/CameraScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const CameraScreen = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [title, setTitle] = useState('');

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setImageUri(response.uri);
            }
        });
    };

    const savePhotoDetails = () => {
        console.log('Image URI:', imageUri);
        console.log('Title:', title);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Button title="Take Photo" onPress={takePhoto} />
            {imageUri && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TouchableOpacity style={styles.button} onPress={savePhotoDetails}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
    },
    input: {
        marginTop: 10,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        padding: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CameraScreen;
