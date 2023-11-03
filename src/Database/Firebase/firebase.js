import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3lzeLASCHwCF5p1Umy552L-Amua9Fvbc",
  authDomain: "todo-app-e48d2.firebaseapp.com",
  projectId: "todo-app-e48d2",
  storageBucket: "todo-app-e48d2.appspot.com",
  messagingSenderId: "861478289205",
  appId: "1:861478289205:web:59a02ac48433207291567c",
  measurementId: "G-PF4K6LZ0C1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
