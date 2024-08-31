import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoRotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Opacity animation
        Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            navigation.replace('Signup');
        });

        // Rotation animation
        Animated.loop(
            Animated.timing(logoRotation, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, [navigation, logoOpacity, logoRotation]);

    // Interpolate rotation value to get degrees
    const rotateInterpolation = logoRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View style={styles.container}>
            <Animated.Image 
                source={require('./../../assets/icons/logo.png')}
                style={[
                    styles.logo, 
                    { opacity: logoOpacity, transform: [{ rotate: rotateInterpolation }] }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 200,
        height: 200,
    },
});

export default SplashScreen;
