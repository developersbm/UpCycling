import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';

export const LoginScreen = ({ navigation }) => {
  const [errorState] = useState('');

  const handleLogin = async (values) => {
    console.log("Handled login with values:", values);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../../../assets/icons/logo.png')} style={styles.image} />
      <Text style={styles.screenTitle}>Welcome back!</Text>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleLogin}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Username is required';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Enter username"
            />
            {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Enter password"
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            {errorState !== '' && <Text style={styles.errorText}>{errorState}</Text>}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MainContainer')}>
              <Text style={styles.buttonText2}>Forgot Password?</Text>
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
    padding: 20,
    justifyContent: 'center',
    marginBottom: 50
  },
  image: {
    width: 180,
    height: 180,
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
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
    marginTop: -20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    width: 170, 
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  buttonText2: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
