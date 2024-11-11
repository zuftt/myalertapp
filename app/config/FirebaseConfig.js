// Import the functions you need from the SDKs you need
import { initializeApp,} from "firebase/app";
import { getFirestore,} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const db=getFirestore(app)