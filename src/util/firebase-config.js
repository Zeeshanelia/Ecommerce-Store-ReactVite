// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzYZcowv5m2yYaYix719S2GVulDG85qN0",
  authDomain: "shoping-club0.firebaseapp.com",
  projectId: "shoping-club0",
  storageBucket: "shoping-club0.firebasestorage.app",
  messagingSenderId: "732810338715",
  appId: "1:732810338715:web:ef0f15a5eae38a03cfc13e",
  measurementId: "G-MN14JZG15E"
};

// Initialize Firebase
const appConfig = initializeApp(firebaseConfig);
export default appConfig

