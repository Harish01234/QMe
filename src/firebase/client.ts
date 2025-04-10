// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-3srl5odmOI916RwTw0NtlGN2Wsuaep8",
  authDomain: "questionme-32223.firebaseapp.com",
  projectId: "questionme-32223",
  storageBucket: "questionme-32223.firebasestorage.app",
  messagingSenderId: "47536490052",
  appId: "1:47536490052:web:cce2e742ebade3b2981e11",
  measurementId: "G-4DNRMHZRGM"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);