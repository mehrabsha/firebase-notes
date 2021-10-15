import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "avers-1e494.firebaseapp.com",
  databaseURL: "https://avers-1e494-default-rtdb.firebaseio.com",
  projectId: "avers-1e494",
  storageBucket: "avers-1e494.appspot.com",
  messagingSenderId: "701657843940",
  appId: "1:701657843940:web:cfa48f7fa9cd266e2c04f1",
  measurementId: "G-DTR26JCJE5"
};

export default initializeApp(firebaseConfig);
