// AuthService.js
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firebase from './firebaseConfig.js';

GoogleSignin.configure({
  webClientId:
    '1002687147571-l68gpttakqvvsbvkf17u78tp20gdg10u.apps.googleusercontent.com',
});

export const signInWithGoogle = async () => {
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential =
      firebase.auth.GoogleAuthProvider.credential(idToken);
    return firebase.auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Error during Google Sign-In: ', error);
    if (!firebase.apps.length) {
      console.error('Firebase App is not initialized');
    }
  }
};

// Add other authentication related functions here
