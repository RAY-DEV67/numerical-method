import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyBNKp2xR9r2ZXh7lN0OlH9BPotEGjt9-UY",
  authDomain: "thrifty2.firebaseapp.com",
  projectId: "thrifty2",
  storageBucket: "thrifty2.appspot.com",
  messagingSenderId: "800082572468",
  appId: "1:800082572468:web:50ca6f711bf433c56b53e1",
  measurementId: "G-XRKZ1N72RB",
});

// Initialize Firebase
const app = firebaseApp;
const db = firebaseApp.firestore()

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = firebase.storage()
export default db
