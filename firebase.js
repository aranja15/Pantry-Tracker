// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-Q5ynklIXT0KTBf_VUVeNIzFQs8Kq30I",
  authDomain: "pantry-tracker-9b834.firebaseapp.com",
  projectId: "pantry-tracker-9b834",
  storageBucket: "pantry-tracker-9b834.appspot.com",
  messagingSenderId: "686606427812",
  appId: "1:686606427812:web:5d2904825bf3757ff3e831",
  measurementId: "G-VJWSF6T5D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};