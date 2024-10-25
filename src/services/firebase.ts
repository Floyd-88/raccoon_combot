import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB8KX1scKDygbdE-4q2em0OYJrx2tVKQCk",
    authDomain: "raccoon-combo.firebaseapp.com",
    databaseURL: "https://raccoon-combo-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "raccoon-combo",
    storageBucket: "raccoon-combo.appspot.com",
    messagingSenderId: "991355935151",
    appId: "1:991355935151:web:1fe8b26a226c205894375a"
  };

  const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };