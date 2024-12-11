import { initializeApp } from "firebase/app"; // Import initializeApp
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXMtUYTlFNphiROIF-16-ACXpJmAnmc1k",
  authDomain: "alert-app-6b760.firebaseapp.com",
  projectId: "alert-app-6b760",
  storageBucket: "alert-app-6b760.appspot.com",
  messagingSenderId: "805278798970",
  appId: "1:805278798970:web:140441c66e7df11038d7c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Correct default and named exports
export { auth, db }; // Named exports
export default app; // Default export
