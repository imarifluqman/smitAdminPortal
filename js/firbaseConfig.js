import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtKZdS5029cscT_tb7j-6s25Z4FeY1Des",
  authDomain: "smitadminportal.firebaseapp.com",
  projectId: "smitadminportal",
  storageBucket: "smitadminportal.appspot.com",
  messagingSenderId: "682029700803",
  appId: "1:682029700803:web:f4f0ae7f5154ae120ab476",
  measurementId: "G-X6SBWZGJ45",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
