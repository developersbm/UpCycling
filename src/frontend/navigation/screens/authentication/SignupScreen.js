import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import { signUpUser } from './authService';

export const SignupScreen = ({ navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorState, setErrorState] = useState('');

    const handleSignup = async (values) => {
        setIsSubmitting(true);
        try {
            await signUpUser({
                username: values.username,
                email: values.email,
                password: values.password
            });
    
            Alert.alert(
                'Success',
                'Account created successfully. Please verify your email.',
                [{ text: 'OK', onPress: () => navigation.navigate('Verification', { username: values.username }) }]
            );
        } catch (error) {
            setErrorState(error.message);
        } finally {
            setIsSubmitting(false);
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
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
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
                            style={[styles.input, touched.username && errors.username ? styles.errorInput : null]}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            placeholder="Username"
                            autoCapitalize="none"
                        />
                        {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                        <TextInput
                            style={[styles.input, touched.email && errors.email ? styles.errorInput : null]}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <TextInput
                            style={[styles.input, touched.password && errors.password ? styles.errorInput : null]}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Password"
                            secureTextEntry
                            autoCapitalize="none"
                        />
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        <TextInput
                            style={[styles.input, touched.confirmPassword && errors.confirmPassword ? styles.errorInput : null]}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            placeholder="Confirm Password"
                            secureTextEntry
                            autoCapitalize="none"
                        />
                        {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                        {errorState !== '' && <Text style={styles.errorText}>{errorState}</Text>}

                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={[styles.button, isSubmitting ? styles.disabledButton : null]}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.buttonText}>{isSubmitting ? 'Signing Up...' : 'Sign Up'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 160,
        height: 160,
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    errorInput: {
        borderColor: 'red',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        backgroundColor: '#ff5c5c',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        elevation: 5,
    },
    disabledButton: {
        backgroundColor: '#d9534f',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});
