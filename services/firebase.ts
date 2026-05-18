import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// ============================================================================
// CONFIGURAZIONE FIREBASE
// ============================================================================
const firebaseConfig = {
  apiKey: "INSERISCI_API_KEY",
  authDomain: "presenze-online.firebaseapp.com",
  databaseURL: "https://presenze-online-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "presenze-online",
  storageBucket: "presenze-online.firebasestorage.app",
  messagingSenderId: "528831758582",
  appId: "1:528831758582:web:951dc100118c68444eacd7",
  measurementId: "G-DEYKGWEL16"
};

// Se abbiamo un URL database corretto possiamo usarlo anche se apiKey è un placeholder
const isFirebaseConfigured = true;

let app;
let rtdb;
let firestore;

try {
  app = initializeApp(firebaseConfig);
  rtdb = getDatabase(app);
  firestore = getFirestore(app);
} catch (error) {
  console.error("Errore durante l'inizializzazione di Firebase:", error);
}

export { app, rtdb, firestore, isFirebaseConfigured };
