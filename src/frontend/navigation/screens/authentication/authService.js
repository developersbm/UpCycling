import { signUp, signIn, signOut, forgotPassword, forgotPasswordSubmit, confirmSignUp } from 'aws-amplify/auth';
import awsconfig from '../../../aws-exports';

// Configure Amplify with your AWS configuration
import { Amplify } from 'aws-amplify';
Amplify.configure(awsconfig);

// Sign up a new user
export const signUpUser = async (username, password, email) => {
    try {
        const signUpResponse = await signUp({
            username,
            password,
            attributes: {
                email
            }
        });
        console.log('Sign-up successful:', signUpResponse);
        return signUpResponse;
    } catch (error) {
        console.error('Error signing up:', error);
        throw new Error(error.message);
    }
};

// Confirm sign up with the code sent to email or phone
export const confirmSignUpUser = async (username, code) => {
    try {
        await confirmSignUp(username, code);
        console.log('Sign-up confirmed successfully.');
    } catch (error) {
        console.error('Error confirming sign up:', error);
        throw new Error(error.message);
    }
};

// Log in an existing user
export const signInUser = async (username, password) => {
  try {
      // Log the inputs to check their values
      console.log('Attempting to sign in with:', { username, password });

      // Ensure username and password are provided
      if (!username || !password) {
          throw new Error('Username and password are required');
      }

      const user = await signIn(username, password);
      console.log('Sign-in successful:', user);
      return user;
  } catch (error) {
      console.error('Error signing in:', error);
      throw new Error(error.message);
  }
};

// Log out the current user
export const signOutUser = async () => {
    try {
        await signOut();
        console.log('User signed out successfully.');
    } catch (error) {
        console.error('Error signing out:', error);
        throw new Error(error.message);
    }
};

// Forgot password request
export const requestForgotPassword = async (username) => {
    try {
        await forgotPassword(username);
        console.log('Password reset request sent successfully.');
    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw new Error(error.message);
    }
};

// Confirm password reset with the code sent to email or phone
export const confirmForgotPassword = async (username, code, newPassword) => {
    try {
        await forgotPasswordSubmit(username, code, newPassword);
        console.log('Password reset successfully.');
    } catch (error) {
        console.error('Error confirming password reset:', error);
        throw new Error(error.message);
    }
};
