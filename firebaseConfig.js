// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFpbWwmh09YMwo8EE7MGeg9KAVN5naHcs",
  authDomain: "signup-form-cadc3.firebaseapp.com",
  projectId: "signup-form-cadc3",
  storageBucket: "signup-form-cadc3.appspot.com",
  messagingSenderId: "219653567561",
  appId: "1:219653567561:web:a6c333de827309adcc3b98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, db, collection, setDoc, doc, getDocs, updateDoc, deleteDoc }