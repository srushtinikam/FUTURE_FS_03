// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBrE2cH95i-6SQukC9cadQiQ2VTY24CJUc",
  authDomain: "rebrand-nike.firebaseapp.com",
  projectId: "rebrand-nike",
  storageBucket: "rebrand-nike.appspot.com",
  messagingSenderId: "990882214576",
  appId: "1:990882214576:web:de92eb95e11beb19610175",
  measurementId: "G-WPMMSWBY99"
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);

//  Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
