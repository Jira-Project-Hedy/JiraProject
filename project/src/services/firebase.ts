// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4GhjGE_JDHLEhVOmyl1_lrF5KZ1fNDxk",
  authDomain: "proyecto-heddy.firebaseapp.com",
  projectId: "proyecto-heddy",
  storageBucket: "proyecto-heddy.appspot.com",
  messagingSenderId: "306825195094",
  appId: "1:306825195094:web:906adf75c08d91a59a95f7",
  measurementId: "G-17GCJ6FS16"
};

// Initialize Firebase
const fb_app = initializeApp(firebaseConfig);

export default fb_app;