import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import { signUp } from '../../../services/authService';

export const SignupScreen = ({ navigation }) => {
    const [errorState, setErrorState] = useState('');

    const handleSignup = async (values) => {
        try {
            await signUp(values.username, values.email, values.password);
            navigation.navigate('Login');
        } catch (error) {
            setErrorState(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('./../../../assets/icons/logo.png')} style={styles.image} />
            <Text style={styles.screenTitle}>Create a new account!</Text>
            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                onSubmit={handleSignup}
                validate={(values) => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Username is required';
                    }
                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Password is required';
                    } else if (values.password.length < 6) {
                        errors.password = 'Password must be at least 6 characters';
                    }
                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'Please confirm your password';
                    } else if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = 'Passwords do not match';
                    }
                    return errors;
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            placeholder="Username"
                        />
                        {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Password"
                            secureTextEntry
                        />
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            placeholder="Confirm Password"
                            secureTextEntry
                        />
                        {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                        <Text>{errorState}</Text>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 50,
        marginTop: 10,
    },
    image: {
        width: 160,
        height: 160,
        alignSelf: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        alignSelf: 'center',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        alignSelf: 'center',
    },
    googleButton: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.85,
        elevation: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    loginButton: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 3,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        alignSelf: 'center',
    }
});
