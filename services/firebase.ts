import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, onDisconnect, set, serverTimestamp, increment } from 'firebase/database';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment as firestoreIncrement } from 'firebase/firestore';

// ============================================================================
// CONFIGURAZIONE FIREBASE
// Inserire qui i dati del proprio progetto Firebase
// ============================================================================
const firebaseConfig = {
  apiKey: "INSERIRE_API_KEY",
  authDomain: "INSERIRE_AUTH_DOMAIN",
  projectId: "INSERIRE_PROJECT_ID",
  databaseURL: "INSERIRE_DATABASE_URL", // Essenziale per Realtime Database
  storageBucket: "INSERIRE_STORAGE_BUCKET",
  messagingSenderId: "INSERIRE_MESSAGING_SENDER_ID",
  appId: "INSERIRE_APP_ID"
};

// Inizializza Firebase solo se la configurazione è stata inserita (placeholder rimosso)
const isFirebaseConfigured = firebaseConfig.apiKey !== "INSERIRE_API_KEY" && firebaseConfig.apiKey !== "";

let app;
let rtdb;
let firestore;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    // Inizializza Realtime Database per la Presence (utenti online)
    rtdb = getDatabase(app);
    // Inizializza Firestore per salvare il totale visite in modo persistente e strutturato (opzionale se usi solo RTDB)
    firestore = getFirestore(app);
  } catch (error) {
    console.error("Errore durante l'inizializzazione di Firebase:", error);
  }
}

export { app, rtdb, firestore, isFirebaseConfigured };
