import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXMtUYTlFNphiROIF-16-ACXpJmAnmc1k",
  authDomain: "alert-app-6b760.firebaseapp.com",
  projectId: "alert-app-6b760",
  storageBucket: "alert-app-6b760.firebasestorage.app",
  messagingSenderId: "805278798970",
  appId: "1:805278798970:web:140441c66e7df11038d7c3",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Correct default and named exports
export { db }; // Named exports
export default app; // Default export
