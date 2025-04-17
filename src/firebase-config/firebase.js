
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCjZTVJ4kAOt9XkahAUIlTNxZLUri3v4r8",
  authDomain: "expense-tracker-51a4c.firebaseapp.com",
  projectId: "expense-tracker-51a4c",
  storageBucket: "expense-tracker-51a4c.firebasestorage.app",
  messagingSenderId: "490417775551",
  appId: "1:490417775551:web:cb1ae4c97b2b304222770a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app)
export { auth, provider, signInWithPopup,db };