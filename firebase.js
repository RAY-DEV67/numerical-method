import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Import Firebase Analytics
import 'firebase/compat/analytics';

const firebaseApp = firebase.initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "thrifty2.firebaseapp.com",
  projectId: "thrifty2",
  storageBucket: "thrifty2.appspot.com",
  messagingSenderId: "800082572468",
  appId: "1:800082572468:web:50ca6f711bf433c56b53e1",
  measurementId: "G-XRKZ1N72RB",
});

// Initialize Firebase
const app = firebaseApp;
const db = firebaseApp.firestore();

// Initialize Firebase Analytics
const analytics = firebaseApp.analytics();

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = firebase.storage();
export { db, analytics, firebase };
