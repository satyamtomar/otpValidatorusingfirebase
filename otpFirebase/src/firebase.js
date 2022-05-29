// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app';
import {getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd_S2jwmQtK5J5O6dhVM_JTYJioDeC0DA",
  authDomain: "otpprovider-80554.firebaseapp.com",
  projectId: "otpprovider-80554",
  storageBucket: "otpprovider-80554.appspot.com",
  messagingSenderId: "13485972002",
  appId: "1:13485972002:web:763a84fea00fb66a38c87b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)