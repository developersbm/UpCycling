import { 
    signUp as amplifySignUp, 
    confirmSignUp as amplifyConfirmSignUp, 
    resendSignUpCode as amplifyResendSignUpCode,
    signIn,
    signOut as amplifySignOut,
    resetPassword,
    confirmResetPassword,
    fetchAuthSession as amplifyFetchAuthSession,
    getCurrentUser as amplifyGetCurrentUser
} from 'aws-amplify/auth';
import axios from 'axios';
import Constants from 'expo-constants';

// Sign up a new user
export const signUpUser = async ({ username, email, password }) => {
    try {
        const { isSignUpComplete, userId, nextStep } = await amplifySignUp({
            username,
            password,
            options: {
                userAttributes: {
                    email,
                },
            }
        });
        console.log('Sign-up successful:', { isSignUpComplete, userId, nextStep });

        if (!isSignUpComplete) {
            const payload = {
                username: username,
                email: email,
                password: password,
            };
            await sendUserDataToDynamoDB(payload);
        }
        return { isSignUpComplete, userId, nextStep };
    } catch (error) {
        console.error('Error signing up:', error);
        throw new Error(error.message);
    }
};

const apiEndpoint = Constants.expoConfig.extra.dynamoDbApiEndpoint;

const sendUserDataToDynamoDB = async (payload) => {
    try {
        const response = await axios.post(`${apiEndpoint}`, payload);
        console.log('User data sent to DynamoDB:', response.data);
    } catch (error) {
        console.error('Error sending data to DynamoDB:', error);
    }
};


// Confirm sign up with the code sent to email
export const confirmSignUpUser = async (username, confirmationCode) => {
    if (!username) {
        throw new Error('Username is required to confirm sign up');
    }
    if (!confirmationCode) {
        throw new Error('Confirmation code is required to confirm sign up');
    }
    try {
        const confirmResponse = await amplifyConfirmSignUp({username, confirmationCode});
        console.log('Sign-up confirmed successfully:', confirmResponse);
        return confirmResponse;
    } catch (error) {
        console.error('Error confirming sign up:', error);
        throw new Error(error.message);
    }
};

// Resend sign-up confirmation code
export const resendConfirmationCode = async (username) => {
    if (!username) {
        throw new Error('Username is required to resend confirmation code');
    }
    try {
        const resendResponse = await amplifyResendSignUpCode({username});
        console.log('Confirmation code resent successfully:', resendResponse);
        return resendResponse;
    } catch (error) {
        console.error('Error resending confirmation code:', error);
        throw new Error(error.message);
    }
};

// Log in an existing user
export const signInUser = async (username, password) => {
    try {
      console.log("Auth: ", username, password);

      const response = await signIn({
        username,
        password
      });
      console.log('Sign in successful', response);
  
      if (response.isSignedIn) {
        console.log('User is signed in:', response.isSignedIn);
      } else {
        console.log('Next step required:', response.nextStep);
      }
    } catch (error) {
      console.error('Login Error:', error.underlyingError);
    }
};

// Log out the current user
export const signOutUser = async () => {
    try {
        await amplifySignOut();
        console.log('User signed out successfully.');
    } catch (error) {
        console.error('Error signing out:', error);
        throw new Error(error.message);
    }
};

// Forgot password request
export const requestForgotPassword = async (username, clientMetadata = {}) => {
    try {
        const result = await resetPassword({
            username,
            options: {
                clientMetadata,
            },
        });
        
        // Extract delivery details if necessary
        const { attributeName, deliveryMedium, destination } = result.nextStep.codeDeliveryDetails;
        
        console.log('Password reset request sent successfully:', { attributeName, deliveryMedium, destination });
        return { attributeName, deliveryMedium, destination };
    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw new Error(error.message);
    }
};

// Confirm password reset with the code sent to email or phone
export const confirmForgotPassword = async (username, confirmationCode, newPassword, clientMetadata = {}) => {
    try {
        await confirmResetPassword({
            username,
            newPassword,
            confirmationCode,
            options: {
                clientMetadata,
            }
        });
        console.log('Password reset successfully.');
    } catch (error) {
        console.error('Error confirming password reset:', error);
        throw new Error(error.message);
    }
};

// Fetch the current authenticated user and session details
export const getAuthenticatedUser = async () => {
    try {
        const user = await amplifyGetCurrentUser();
        const session = await amplifyFetchAuthSession();
        console.log('Current user:', user);
        console.log('Current session:', session);
        return user;  // Return user directly or { user, session }
    } catch (error) {
        console.error('Error fetching authenticated user:', error);
        throw new Error(error.message);
    }
};
