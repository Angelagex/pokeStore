// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3uNZ98KANsGiNkuA39GyXY8DsZeQ9B4k",
  authDomain: "pokeapi-ed152.firebaseapp.com",
  projectId: "pokeapi-ed152",
  storageBucket: "pokeapi-ed152.appspot.com",
  messagingSenderId: "13352493139",
  appId: "1:13352493139:web:38b05d40cd1f15a4cf26a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()