// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfkmLVeyhQJWVmO33WXO7edQk457QTp3M",
  authDomain: "myblogwithfirebase.firebaseapp.com",
  projectId: "myblogwithfirebase",
  storageBucket: "myblogwithfirebase.appspot.com",
  messagingSenderId: "121159709807",
  appId: "1:121159709807:web:7fb77612dbe4215662099a",
  measurementId: "G-HB8E13MPVZ",
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
