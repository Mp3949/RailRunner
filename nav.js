import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authButtons = document.getElementById('authButtons');

// Function to update UI based on user authentication state
const updateUI = (user) => {
    if (user) {
        // User is logged in
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        // User is logged out
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
};

// Function to handle logout
const logout = () => {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            alert('logout suuccesfullly.!');
        })
        .catch((error) => {
            console.error('Sign-out error:', error);
        });
};

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    updateUI(user);
});

function myMenuFunction() {
    var navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}

function showlogin() {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    x.style.left = "4px";
    y.style.right = "-520px";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function showregister() {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    x.style.left = "-510px";
    y.style.right = "5px";
    x.style.opacity = 0;
    y.style.opacity = 1;
}