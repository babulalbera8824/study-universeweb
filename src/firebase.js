import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkLOpPbC0nBlICSzX5-T6ysjlGj21Sv04",
  authDomain: "study-universe-88a65.firebaseapp.com",
  projectId: "study-universe-88a65",
  storageBucket: "study-universe-88a65.firebasestorage.app",
  messagingSenderId: "836796580336",
  appId: "1:836796580336:web:2e19641a9c0c0a1a269d35",
  measurementId: "G-4N1MWRT1T7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
