// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import { initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxHY2kFc5rHkmbSnkrXaWzs45hkPm6PBU",
  authDomain: "hrmanagementsystem-7d92e.firebaseapp.com",
  projectId: "hrmanagementsystem-7d92e",
  storageBucket: "hrmanagementsystem-7d92e.appspot.com",
  messagingSenderId: "555741852966",
  appId: "1:555741852966:web:d459270f8fe6cbb0733de7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const firebaseAuth = getAuth(app);
export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// ios : 479751315674-971pc62agshf6obhc2mj3mp4itrg71o7.apps.googleusercontent.com