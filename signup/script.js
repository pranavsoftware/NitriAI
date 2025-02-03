// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Ensure the button exists before adding an event listener
const registerBtn = document.getElementById("register-btn");
if (registerBtn) {
    registerBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        // Get user inputs (Fixed issue by using double quotes)
        const fullName = document.querySelector("input[placeholder=\"Applicant's Full Name\"]").value.trim();
        const dob = document.querySelector("input[placeholder='Date Of Birth']").value.trim();
        const gender = document.querySelector("select").value;
        const email = document.querySelector("input[placeholder='Enter Your E-mail Address']").value.trim();
        const password = document.querySelector("input[placeholder='Enter Password']").value.trim();

        // Form Validation
        if (!fullName || !dob || gender === "Select Gender" || !email || !password) {
            alert("⚠️ Please fill in all fields.");
            return;
        }

        try {
            // Register user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send email verification
            await sendEmailVerification(user);
            alert("📩 Verification email sent! Please check your inbox.");

            // Save user data in Firestore (excluding password)
            await setDoc(doc(db, "users", user.uid), {
                fullName,
                dob,
                gender,
                email,
                userId: user.uid
            });

            // Redirect user to login page after successful signup
            setTimeout(() => {
                window.location.href = "../login page2/login.html";
            }, 2000);
        } catch (error) {
            alert("❌ Error: " + error.message);
        }
    });
} else {
    console.error("❌ Error: register-btn not found in the DOM.");
}
