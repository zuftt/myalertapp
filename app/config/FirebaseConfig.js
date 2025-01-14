import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXMtUYTlFNphiROIF-16-ACXpJmAnmc1k",
  authDomain: "alert-app-6b760.firebaseapp.com",
  projectId: "alert-app-6b760",
  storageBucket: "alert-app-6b760.appspot.com",
  messagingSenderId: "805278798970",
  appId: "1:805278798970:web:140441c66e7df11038d7c3",
};

console.log("Firebase config before initialization:", firebaseConfig); // Log the firebaseConfig object

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Use AsyncStorage for persistence
});


// Initialize Firestore
const db = getFirestore(app);

// Correct default and named exports
export { auth, db }; // Named exports
export default app; // Default export
