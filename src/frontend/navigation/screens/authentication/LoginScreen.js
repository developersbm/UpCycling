import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import { signIn } from '../../../services/authService';

export const LoginScreen = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    try {
      await signIn(values.username, values.password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainContainer' }],
      });
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
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
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, touched.username && errors.username ? styles.errorInput : null]}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Enter username"
              autoCapitalize="none"
            />
            {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            <TextInput
              style={[styles.input, touched.password && errors.password ? styles.errorInput : null]}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Enter password"
              secureTextEntry
              autoCapitalize="none"
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TouchableOpacity onPress={handleSubmit} style={[styles.button, isSubmitting ? styles.disabledButton : null]} disabled={isSubmitting}>
              <Text style={styles.buttonText}>{isSubmitting ? 'Logging In...' : 'Log In'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.linkButton}>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.linkButton}>
              <Text style={styles.linkText}>Forgot Password?</Text>
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
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    marginTop: 20,
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
  button: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#d9534f',
  },
  linkButton: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
