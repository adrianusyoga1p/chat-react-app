// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-app-2bd6d.firebaseapp.com",
  projectId: "react-app-2bd6d",
  storageBucket: "react-app-2bd6d.appspot.com",
  messagingSenderId: "946616100304",
  appId: "1:946616100304:web:893be197a4689f70a5c5d5",
  // databaseURL: "https://react-app-2bd6d-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
