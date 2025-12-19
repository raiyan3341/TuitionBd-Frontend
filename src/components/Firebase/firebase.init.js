// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARZE5SamuaGdQgNGzubms6548ggyPGCsY",
  authDomain: "e-tuitionbd-8f25b.firebaseapp.com",
  projectId: "e-tuitionbd-8f25b",
  storageBucket: "e-tuitionbd-8f25b.firebasestorage.app",
  messagingSenderId: "445794540636",
  appId: "1:445794540636:web:212376e86dba0f51ee9a99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);