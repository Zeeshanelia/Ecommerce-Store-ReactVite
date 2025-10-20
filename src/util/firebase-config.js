// Import the functions you need from the SDKs you need
<<<<<<< HEAD
import { initializeApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
=======
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
>>>>>>> 43360bff556c7beeeac6c9aab57f55638a3d1a5d
const firebaseConfig = {
  apiKey: "AIzaSyDzYZcowv5m2yYaYix719S2GVulDG85qN0",
  authDomain: "shoping-club0.firebaseapp.com",
  projectId: "shoping-club0",
  storageBucket: "shoping-club0.firebasestorage.app",
  messagingSenderId: "732810338715",
  appId: "1:732810338715:web:ef0f15a5eae38a03cfc13e",
  measurementId: "G-MN14JZG15E"
};

<<<<<<< HEAD
//  Default User App
const appConfig =
  getApps().find((a) => a.name === "[DEFAULT]") ||
  initializeApp(firebaseConfig);

//  Separate Admin App Instance
const adminAppConfig =
  getApps().find((a) => a.name === "adminApp") ||
  initializeApp(firebaseConfig, "adminApp");

export { appConfig, adminAppConfig };

//  Add this line to fix your import error
export default appConfig;
=======
// Initialize Firebase
const appConfig = initializeApp(firebaseConfig);
export default appConfig

>>>>>>> 43360bff556c7beeeac6c9aab57f55638a3d1a5d
