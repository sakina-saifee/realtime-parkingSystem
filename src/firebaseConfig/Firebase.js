import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD6qJD_s5ksogZ4A39O0jqNctbpE9GHNII",
  authDomain: "realtimeprocessingsystem-6b16d.firebaseapp.com",
  databaseURL: "https://realtimeprocessingsystem-6b16d-default-rtdb.firebaseio.com",
  projectId: "realtimeprocessingsystem-6b16d",
  storageBucket: "realtimeprocessingsystem-6b16d.appspot.com",
  messagingSenderId: "883220209316",
  appId: "1:883220209316:web:443476d41e7d887889d031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getDatabase(app);

