// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY9WmV5wk2B0Vkg8Kh87lvO34WdWwWt9o",
  authDomain: "fir-reactjs-f308f.firebaseapp.com",
  projectId: "fir-reactjs-f308f",
  storageBucket: "fir-reactjs-f308f.firebasestorage.app",
  messagingSenderId: "899594988485",
  appId: "1:899594988485:web:f2cb11b59d0865390f79ac",
  measurementId: "G-NMT07FVPHT"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export default app;