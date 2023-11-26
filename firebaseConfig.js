import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDBnpcGMx-Nm-ZWuefYU-lcX9FZbLLF2Zo',
  authDomain: 'videobookmark-84772.firebaseapp.com',
  projectId: 'videobookmark-84772',
  storageBucket: 'videobookmark-84772.appspot.com',
  messagingSenderId: '274554538083',
  appId: '1:274554538083:web:9247d5bf95fe8ded081056',
  measurementId: 'G-C8EYNSBSH4',
};

console.log(
  'Firebase App Name: ',
  firebase.apps.length ? firebase.apps[0].name : 'No Firebase App',
);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
