// frontend/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // If you plan to use Firestore later

const firebaseConfig = {
  apiKey: "AIzaSyAC4r_21vzxDk4eOoXAG3OiRJOgE8iQJ3Q",
  authDomain: "e-commerce-website-908b5.firebaseapp.com",
  projectId: "e-commerce-website-908b5",
  storageBucket: "e-commerce-website-908b5.firebasestorage.app",
  messagingSenderId: "857256275972",
  appId: "1:857256275972:web:cd8014f1c41b6dd7348551",
  measurementId: "G-PJYMPH2PCB"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app); // Optional: for later
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db, app };