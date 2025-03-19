
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { onAuthStateChanged,
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB8jJWu1lmuBgToqmo_lFkiNSQgxfrplZk",
    authDomain: "easy-journey2024.firebaseapp.com",
    databaseURL: "https://easy-journey2024-default-rtdb.firebaseio.com",
    projectId: "easy-journey2024",
    storageBucket: "easy-journey2024.appspot.com",
    messagingSenderId: "411835766644",
    appId: "1:411835766644:web:69fb9e8e84f18307637e21"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Function to check if user is logged in
const checkAuth = () => {
    const auth = getAuth(); // Assuming you have initialized Firebase Authentication correctly

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // User is not logged in
            // Example: Change background color
            alert("Please login to access this page.");
            
            // Redirect to login page
            window.location.href = 'index.html';
        }
    });
};


// Check authentication on page load
checkAuth();
