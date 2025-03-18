// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDPoQCAzB9QuXadZbeq3HjD2m-QdRvoXDo",
    authDomain: "buspay-5eaf8.firebaseapp.com",
    projectId: "buspay-5eaf8",
    storageBucket: "buspay-5eaf8.appspot.com",
    messagingSenderId: "1061744556689",
    appId: "1:1061744556689:web:c09203a5ae9e163df21d30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, googleProvider };
