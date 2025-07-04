// firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHqsn6hXdpJnxgPd3-TIMll0MX8Lf_cgA",
    authDomain: "er-furniture.firebaseapp.com",
    projectId: "er-furniture", // ← SPRAWDŹ CZY TO JEST PRAWIDŁOWE!
    storageBucket: "er-furniture.firebasestorage.app",
    messagingSenderId: "634043754853",
    appId: "1:634043754853:web:7ff269359a3f13de69d98c",
    measurementId: "G-VPMBSVBBE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();

export default app;