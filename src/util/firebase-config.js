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

//  Initialize the default app only once
const appConfig =
  getApps().find((a) => a.name === "[DEFAULT]") ||
  initializeApp(firebaseConfig);

//  Create a separate Admin App instance (optional)
const adminAppConfig =
  getApps().find((a) => a.name === "adminApp") ||
  initializeApp(firebaseConfig, "adminApp");

//  Export both apps for use elsewhere
export { appConfig, adminAppConfig };

//  Default export (so you can `import appConfig from "../util/firebase-config"`)
export default appConfig;
