// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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

// Function to fetch user's full name from Firestore
async function fetchUserName(userId) {
    try {
        const userDocRef = doc(db, "users", userId); // Assuming user data is in a "users" collection
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.fullName || "User"; // Use full name if available, else default to "User"
        } else {
            console.error("User document not found.");
            return "User";
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return "User";
    }
}

// Check authentication state and update UI
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userNameElement = document.getElementById("userName");

        try {
            const fullName = await fetchUserName(user.uid); // Get full name from Firestore
            userNameElement.textContent = fullName;
        } catch (error) {
            console.error("Error displaying user name:", error);
            userNameElement.textContent = "User";
        }
    } else {
        // Redirect to login page if not authenticated
        window.location.href = "../login/index.html";
    }
});
