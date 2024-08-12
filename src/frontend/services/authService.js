import { Auth } from 'aws-amplify';

// Configure Amplify here or ensure it is configured elsewhere in your app
// import amplifyconfig from './amplifyconfiguration.json';
// Amplify.configure(amplifyconfig);

// Sign up a new user
export const signUp = async (username, email, password) => {
  try {
    const data = await Auth.signUp({
      username,
      password,
      attributes: { email },
    });
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw new Error(error.message);
  }
};

// Confirm sign up with the code sent to email
export const confirmSignUp = async (username, code) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.error('Error confirming sign up:', error);
    throw new Error(error.message);
  }
};

// Log in an existing user
export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error(error.message);
  }
};

// Log out the current user
export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error(error.message);
  }
};

// Forgot password request
export const forgotPassword = async (username) => {
  try {
    await Auth.forgotPassword(username);
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw new Error(error.message);
  }
};

// Confirm password reset with the code sent to email
export const confirmPassword = async (username, code, newPassword) => {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword);
  } catch (error) {
    console.error('Error confirming password reset:', error);
    throw new Error(error.message);
  }
};
