import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCpz8rWe6l71rdOjiV0JDE9Kp0kJhQfUpw",
    authDomain: "react-auth-todo-d86ea.firebaseapp.com",
    databaseURL: "https://react-auth-todo-d86ea-default-rtdb.firebaseio.com",
    projectId: "react-auth-todo-d86ea",
    storageBucket: "react-auth-todo-d86ea.firebasestorage.app",
    messagingSenderId: "863872251200",
    appId: "1:863872251200:web:caab4101a949f6083076a5",
    measurementId: "G-QH1LWVLNDH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
