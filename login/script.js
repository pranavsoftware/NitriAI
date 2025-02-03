// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB28dGL0uXk2Q-WYG3KF9ORIchNHSV8HeE",
  authDomain: "nutration-ai.firebaseapp.com",
  projectId: "nutration-ai",
  storageBucket: "nutration-ai.firebasestorage.app",
  messagingSenderId: "360757046717",
  appId: "1:360757046717:web:7a680458131cf0bae0f6d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Login Form Submission
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("input[placeholder='Your Email']").value;
  const password = document.querySelector("input[placeholder='Your Password']").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if the user is verified
    if (user.emailVerified) {
      alert("Login successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html"; // Redirect to the dashboard
    } else {
      alert("Please verify your email before logging in. Check your inbox for the verification email.");
      await signOut(auth); // Logout user if not verified
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// Automatically Check User Status on Page Load
onAuthStateChanged(auth, (user) => {
  if (user && user.emailVerified) {
    window.location.href = "../dashboard/index.html"; // Redirect if already logged in and verified
  }
});
