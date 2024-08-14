import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { confirmSignUpUser, resendConfirmationCode } from './authService';

const VerificationScreen = ({ route, navigation }) => {
  const { username } = route.params || {};
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!username) {
    // Handle the case where username is not passed
    Alert.alert('Error', 'Username is missing. Please try signing up again.');
    navigation.navigate('Signup');
    return null;
  }

  const handleVerification = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("erfe", values.code)
      await confirmSignUpUser(username, values.code);
      Alert.alert('Success', 'Your account has been verified.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendConfirmationCode(username);
      Alert.alert('Success', 'A new verification code has been sent to your email.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>A verification code has been sent to your email. Please enter it below:</Text>

      <Formik
        initialValues={{ code: '' }}
        onSubmit={handleVerification}
        validate={(values) => {
          const errors = {};
          if (!values.code) {
            errors.code = 'Verification code is required';
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={[styles.input, touched.code && errors.code ? styles.errorInput : null]}
              onChangeText={handleChange('code')}
              onBlur={handleBlur('code')}
              value={values.code}
              placeholder="Enter verification code"
            />
            {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}

            <TouchableOpacity onPress={handleSubmit} style={[styles.button, isSubmitting ? styles.disabledButton : null]} disabled={isSubmitting}>
              <Text style={styles.buttonText}>{isSubmitting ? 'Verifying...' : 'Verify'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleResendCode} style={styles.resendButton}>
              <Text style={styles.resendText}>Resend Code</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
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
  resendButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  resendText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default VerificationScreen;