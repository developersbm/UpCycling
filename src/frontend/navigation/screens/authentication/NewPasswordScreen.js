import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { confirmForgotPassword } from './authService';

const NewPasswordScreen = ({ route, navigation }) => {
  const { username } = route.params; // We only need the username from route params

  // Initialize step in state (assuming step 1 is the password reset, step 2 is after success)
  const [step, setStep] = useState(1);

  // Ensure username is defined
  if (!username) {
    Alert.alert('Error', 'Invalid or missing parameters.');
    navigation.goBack(); // Navigate back if params are missing
    return null;
  }

  // Handle password reset confirmation...
  const handlePasswordResetConfirm = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await confirmForgotPassword(username, values.confirmationCode, values.newPassword);
      Alert.alert('Success', 'Password has been reset successfully.');
      setStep(2); // Update step after successful reset
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      <Formik
        initialValues={{ confirmationCode: '', newPassword: '', confirmPassword: '' }}
        onSubmit={handlePasswordResetConfirm}
        validate={(values) => {
          const errors = {};
          if (!values.confirmationCode) {
            errors.confirmationCode = 'Confirmation code is required';
          }
          if (!values.newPassword) {
            errors.newPassword = 'New password is required';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
          }
          if (values.newPassword && values.confirmPassword && values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {step === 1 && (
              <>
                {/* Confirmation Code Input */}
                <TextInput
                  style={[styles.input, touched.confirmationCode && errors.confirmationCode ? styles.errorInput : null]}
                  onChangeText={handleChange('confirmationCode')}
                  onBlur={handleBlur('confirmationCode')}
                  value={values.confirmationCode}
                  placeholder="Enter confirmation code"
                />
                {touched.confirmationCode && errors.confirmationCode && (
                  <Text style={styles.errorText}>{errors.confirmationCode}</Text>
                )}

                {/* New Password Input */}
                <TextInput
                  style={[styles.input, touched.newPassword && errors.newPassword ? styles.errorInput : null]}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  placeholder="Enter new password"
                  secureTextEntry
                />
                {touched.newPassword && errors.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}

                {/* Confirm Password Input */}
                <TextInput
                  style={[styles.input, touched.confirmPassword && errors.confirmPassword ? styles.errorInput : null]}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder="Confirm new password"
                  secureTextEntry
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 2 && (
              <View style={styles.successContainer}>
                <Text style={styles.successMessage}>Password has been reset successfully!</Text>
              </View>
            )}
          </View>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkButton}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
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
  successContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPasswordScreen;
