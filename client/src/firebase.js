// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-8dcc4.firebaseapp.com",
    projectId: "mern-auth-8dcc4",
    storageBucket: "mern-auth-8dcc4.appspot.com",
    messagingSenderId: "1012189469675",
    appId: "1:1012189469675:web:9fd7ef3a15093a0b0917ae",
    measurementId: "G-PG610H3HXE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);