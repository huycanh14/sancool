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
  apiKey: "AIzaSyBv4yinXtrRLvdtAmh0wt9y3VyoWr-OfRU",
  authDomain: "sancool-dev.firebaseapp.com",
  projectId: "sancool-dev",
  storageBucket: "sancool-dev.appspot.com",
  messagingSenderId: "160396527548",
  appId: "1:160396527548:web:350ae1705748f36db40db9",
  measurementId: "G-J85642DEFX",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(appFirebase);
export const auth = getAuth(appFirebase);
