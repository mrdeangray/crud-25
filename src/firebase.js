// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrthgXHZHC3V9vHGMNpeUEIlxp9dCEQJ0",
    authDomain: "geomapp-3e7e3.firebaseapp.com",
    projectId: "geomapp-3e7e3",
    storageBucket: "geomapp-3e7e3.appspot.com",
    messagingSenderId: "336571326249",
    appId: "1:336571326249:web:3f3d4ebf1c65b909bca138",
    measurementId: "G-084KRD1C3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestoreDB = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})