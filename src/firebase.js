
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDBrCiRSZEZhZFqMnLPVczSZA4eM-mSdLY",
  authDomain: "chat-b0a92.firebaseapp.com",
  projectId: "chat-b0a92",
  storageBucket: "chat-b0a92.appspot.com",
  messagingSenderId: "452430741918",
  appId: "1:452430741918:web:e068b9833e944d2b03568f",
  measurementId: "G-16PFGLVE7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
