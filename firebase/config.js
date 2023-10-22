// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "Firebase/firebase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO7qHYYUDrlBwpYBIa_m9JMAA6oKdqoeY",
  authDomain: "uolkut-f63cf.firebaseapp.com",
  projectId: "uolkut-f63cf",
  storageBucket: "uolkut-f63cf.appspot.com",
  messagingSenderId: "329224674491",
  appId: "1:329224674491:web:8ff489a7146089f8779d9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };