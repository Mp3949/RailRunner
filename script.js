import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut, onAuthStateChanged
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
const database = getDatabase(firebaseApp);

// Check login state on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        const formBox = document.querySelector('.form-box');
        if (formBox) {
            formBox.style.display = 'none'; // Hide the form-box
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.style.display = 'block'; // Show the logout button
        }

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            // Extract the part of the email before the '@' symbol
            const username = user.email.split('@')[0];
            heroSection.innerHTML = `
                <h1>Welcome, ${username}!</h1>
                <p>You are now logged in. Enjoy your journey with RailRunner.</p>
                <a href="Ticket.html" class="btn hero-btn">Book Now</a>
            `;
        }
    } else {
        // User is logged out
        const formBox = document.querySelector('.form-box');
        if (formBox) {
            formBox.style.display = 'block'; // Show the form-box
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.style.display = 'none'; // Hide the logout button
        }

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            // Extract the part of the email before the '@' symbol
            const username = user.email.split('@')[0];
            heroSection.innerHTML = `
                <h1>Welcome, ${username}!</h1>
                <p>You are now logged in. Enjoy your journey with RailRunner.</p>
                <a href="Ticket.html" class="btn hero-btn">Book Now</a>
            `;
        }
    }
});

// Register button event listener
let registerButton = document.getElementById('registerSubmitBtn');
registerButton.addEventListener('click', () => {
    let email = document.getElementById('Email').value;
    let password = document.getElementById('Password').value;
    let username = document.getElementById('Username').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
                password: password
            })
                .then(() => {
                    alert('User created successfully!');
                    showlogin();
                })
                .catch((error) => {
                    alert('Error saving user data: ' + error.message);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
});

// Login button event listener
let loginButton = document.getElementById('loginSubmitBtn');
loginButton.addEventListener('click', () => {
    let email = document.getElementById('Emaillogin').value;
    let password = document.getElementById('Passwordlogin').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Hide the form-box after successful login
            const formBox = document.querySelector('.form-box');
            if (formBox) {
                formBox.style.display = 'none';
            }

            // Show the logout button
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.style.display = 'block';
            }

            // Update the hero-section with a welcome message
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                // Extract the part of the email before the '@' symbol
                const username = user.email.split('@')[0];
                heroSection.innerHTML = `
                    <h1>Welcome, ${username}!</h1>
                    <p>You are now logged in. Enjoy your journey with RailRunner.</p>
                    <a href="Ticket.html" class="btn hero-btn">Book Now</a>
                `;
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
});

// Logout button event listener
let logout = document.getElementById('logoutBtn');
logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('Logout successful!');

        // Show the form-box after logout
        const formBox = document.querySelector('.form-box');
        if (formBox) {
            formBox.style.display = 'block';
        }

        // Hide the logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }

        // Reset the hero-section to the default message
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.innerHTML = `
                <h1>Welcome to RailRunner</h1>
                <p>Your journey starts here. Book your train tickets with ease and enjoy the ride.</p>
                <a href="Ticket.html" class="btn hero-btn">Book Now</a>
            `;
        }
    }).catch((error) => {
        alert('Error during logout: ' + error.message);
    });
});

// Forgot password link event listener
let forgotpassword = document.getElementById('Forgotpassword');
forgotpassword.addEventListener('click', () => {
    let email = document.getElementById('Emaillogin').value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

function validateEmail(email) {
    var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}