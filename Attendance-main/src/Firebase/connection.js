import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyA3V-QJGlqqeevhronza8y2YfJ6kNzDC4I",
  authDomain: "attendence-3de9b.firebaseapp.com",
  databaseURL: "https://attendence-3de9b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "attendence-3de9b",
  storageBucket: "attendence-3de9b.appspot.com",
  messagingSenderId: "691996248916",
  appId: "1:691996248916:web:f9f22385d3d8a99f9c96c1",
  measurementId: "G-DPH294DWBG"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const fs = app.firestore();

export { app, auth, fs };
