import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPoQCAzB9QuXadZbeq3HjD2m-QdRvoXDo",
    authDomain: "buspay-5eaf8.firebaseapp.com",
    projectId: "buspay-5eaf8",
    storageBucket: "buspay-5eaf8.firebasestorage.app",
    messagingSenderId: "1061744556689",
    appId: "1:1061744556689:web:c09203a5ae9e163df21d30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export services for use in other files
export { auth, googleProvider, db };