import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const logoOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            navigation.replace('Signup');
        });
    }, [navigation, logoOpacity]);

    return (
        <View style={styles.container}>
            <Animated.Image 
                source={require('./../../assets/logo.png')}
                style={[styles.logo, { opacity: logoOpacity }]}            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 200,
        height: 200,
    },
});

export default SplashScreen;
