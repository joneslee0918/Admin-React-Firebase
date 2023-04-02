import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjtyBE-7-hbiP9mbWnJlfRmT2cj7e7Jl4",
  authDomain: "wildcardp2e-d70fe.firebaseapp.com",
  databaseURL: "https://wildcardp2e-d70fe-default-rtdb.firebaseio.com",
  projectId: "wildcardp2e-d70fe",
  storageBucket: "wildcardp2e-d70fe.appspot.com",
  messagingSenderId: "430891799641",
  appId: "1:430891799641:web:57cef4b0385b58f2048d48",
  measurementId: "G-0JSY294NLT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const clientRef = ref(db, "allclients");
const deckRef = ref(db, "alldecks");

export { db, clientRef, deckRef };
