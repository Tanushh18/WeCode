import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgiNAY9szo5MzUnU5fmhnA_z06R-Q2Iso",
  authDomain: "wecode-5c5a0.firebaseapp.com",
  projectId: "wecode-5c5a0",
  storageBucket: "wecode-5c5a0.firebasestorage.app",
  messagingSenderId: "856953816414",
  appId: "1:856953816414:web:e1eb1213d0d447bff8bbcf",
  measurementId: "G-2JNCBZHTTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);

export { auth, provider, analytics };
