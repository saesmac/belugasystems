// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAnzum1QlpRdBzaFHt_FvWudxg6LOSWdbw",
  authDomain: "beluga-systems.firebaseapp.com",
  databaseURL: "https://beluga-systems-default-rtdb.firebaseio.com",
  projectId: "beluga-systems",
  storageBucket: "beluga-systems.appspot.com",
  messagingSenderId: "248891848810",
  appId: "1:248891848810:web:028584ab6d67c241827213",
  measurementId: "G-3FBWHFXSJC"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// firebase.js
export { db as database };
