// src/config/firebase.js

// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-FGu1rgioRXGh2vSBmNDO4OKmKgZjnug",
  authDomain: "smart-health-card-40005.firebaseapp.com",
  projectId: "smart-health-card-40005",
  storageBucket: "smart-health-card-40005.firebasestorage.app",
  messagingSenderId: "584242475642",
  appId: "1:584242475642:web:73655d00174ea10eabc1c3",
  measurementId: "G-NTW9Y1SBGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services you need
export const auth = getAuth(app);
export const db = getFirestore(app);
