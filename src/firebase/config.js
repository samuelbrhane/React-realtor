import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "realtor-6d1d8.firebaseapp.com",
  projectId: "realtor-6d1d8",
  storageBucket: "realtor-6d1d8.appspot.com",
  messagingSenderId: "473729529550",
  appId: "1:473729529550:web:4fd60c3130e529c4a3c29f",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
export { auth, db };
export default app;
