// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcCEn45beejgSrrS2o4uxGKJYdMl1_J_U",
  authDomain: "sancool-pro.firebaseapp.com",
  projectId: "sancool-pro",
  storageBucket: "sancool-pro.appspot.com",
  messagingSenderId: "144115487982",
  appId: "1:144115487982:web:af5a466213aa8b7c4a0fff",
  measurementId: "G-5JCMZGNGDS",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(appFirebase);
export const auth = getAuth(appFirebase);
