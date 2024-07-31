import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { TouchableOpacity} from 'react-native';
import { Image } from 'react-native';

export const SignupScreen = ({ navigation }) => {
    const [errorState] = useState('');

    const handleSignup = async (values) => {
        console.log("Created user");
    };
    return (
        <View style={styles.container}>
            <Image source={require('./../../../assets/icons/logo.png')} style={styles.image} />
            <Text style={styles.screenTitle}>Create a new account!</Text>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                onSubmit={handleSignup}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        {touched.email && errors.email && <Text>{errors.email}</Text>}
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Password"
                            secureTextEntry
                        />
                        {touched.password && errors.password && <Text>{errors.password}</Text>}
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            placeholder="Confirm Password"
                            secureTextEntry
                        />
                        {touched.confirmPassword && errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}
                        <Text>{errorState}</Text>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
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
        width: 150, 
        alignSelf: 'center',
    },    
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
});
