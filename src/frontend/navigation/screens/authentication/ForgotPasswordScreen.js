import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { requestForgotPassword, confirmForgotPassword } from './authService';

const ForgotPasswordScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');

  const handlePasswordResetRequest = async (values) => {
    try {
      await requestForgotPassword(values.username);
      setUsername(values.username); // Save the username for the confirmation step
      setStep(2);
      Alert.alert('Success', 'A password reset code has been sent to your email.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handlePasswordResetConfirm = async (values) => {
    try {
      await confirmForgotPassword(username, values.code, values.newPassword);
      Alert.alert('Success', 'Password has been reset successfully.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{step === 1 ? 'Forgot Password' : 'Reset Password'}</Text>

      <Formik
        initialValues={step === 1 ? { username: '' } : { code: '', newPassword: '' }}
        onSubmit={step === 1 ? handlePasswordResetRequest : handlePasswordResetConfirm}
        validate={(values) => {
          const errors = {};
          if (step === 1 && !values.username) {
            errors.username = 'Username is required';
          }
          if (step === 2) {
            if (!values.code) {
              errors.code = 'Reset code is required';
            }
            if (!values.newPassword) {
              errors.newPassword = 'New password is required';
            }
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {step === 1 ? (
              <View>
                <TextInput
                  style={[styles.input, touched.username && errors.username ? styles.errorInput : null]}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  placeholder="Enter username"
                />
                {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Send Reset Code</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TextInput
                  style={[styles.input, touched.code && errors.code ? styles.errorInput : null]}
                  onChangeText={handleChange('code')}
                  onBlur={handleBlur('code')}
                  value={values.code}
                  placeholder="Enter reset code"
                />
                {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}

                <TextInput
                  style={[styles.input, touched.newPassword && errors.newPassword ? styles.errorInput : null]}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  placeholder="Enter new password"
                  secureTextEntry
                />
                {touched.newPassword && errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </Formik>

      {step === 1 && (
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkButton}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 20,
    textAlign: 'center',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  linkButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
