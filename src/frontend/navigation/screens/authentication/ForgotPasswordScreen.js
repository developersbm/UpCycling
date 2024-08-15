import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { requestForgotPassword, confirmForgotPassword } from './authService';

const ForgotPasswordScreen = ({ navigation }) => {
  const [step, setStep] = useState(1); // Step 1 is requesting the reset code, Step 2 is resetting the password
  const [username, setUsername] = useState('');

  // Handle request for password reset code
  const handlePasswordResetRequest = async (values) => {
    try {
        // Assume `requestForgotPassword` sends the reset code to the user's email
        const resetDetails = await requestForgotPassword(values.username);
        setUsername(values.username); // Save the username for step 2
  
        // Now navigate to the NewPassword screen and pass username and resetDetails as params
        navigation.navigate('NewPassword', { username: values.username, resetDetails });
        
        Alert.alert('Success', `A password reset code has been sent to ${resetDetails.destination}.`);
    } catch (error) {
        Alert.alert('Error', error.message);
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{step === 1 ? 'Forgot Password' : 'Reset Password'}</Text>

      <Formik
        initialValues={
          step === 1
            ? { username: '' }
            : { code: '', newPassword: '', confirmPassword: '' }
        }
        onSubmit={handlePasswordResetRequest}
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
            if (!values.confirmPassword) {
              errors.confirmPassword = 'Confirm password is required';
            }
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {step === 1 ? (
              // Step 1: Request Reset Code
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
              // Step 2: Reset Password
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

                <TextInput
                  style={[styles.input, touched.confirmPassword && errors.confirmPassword ? styles.errorInput : null]}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder="Confirm new password"
                  secureTextEntry
                />
                {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

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