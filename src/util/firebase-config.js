// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzYZcowv5m2yYaYix719S2GVulDG85qN0",
  authDomain: "shoping-club0.firebaseapp.com",
  projectId: "shoping-club0",
  storageBucket: "shoping-club0.firebasestorage.app",
  messagingSenderId: "732810338715",
  appId: "1:732810338715:web:ef0f15a5eae38a03cfc13e",
  measurementId: "G-MN14JZG15E"
};

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
