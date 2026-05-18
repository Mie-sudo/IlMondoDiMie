import { useState, useEffect } from 'react';
import { rtdb, isFirebaseConfigured } from '../services/firebase';
import { ref, onValue, onDisconnect, set, increment, get, child } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid'; // need to install uuid

export function useVisitors(initialTotal: number = 1242) {
  const [visitorCount, setVisitorCount] = useState<number>(initialTotal);
  const [activeUsers, setActiveUsers] = useState<number>(2); // Default to 2 for visuals if no firebase

  useEffect(() => {
    if (!isFirebaseConfigured || !rtdb) {
      console.warn("Firebase non è configurato. Inserire i parametri in src/services/firebase.ts per le statistiche in tempo reale.");
      return;
    }

    // Identificatore univoco per questa sessione
    const sessionId = sessionStorage.getItem('session_id') || uuidv4();
    if (!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', sessionId);
    }

    // Riferimenti Realtime Database
    const activeUsersRef = ref(rtdb, 'stats/activeUsers');
    const totalVisitsRef = ref(rtdb, 'stats/totalVisits');
    const userSessionRef = ref(rtdb, `stats/sessions/${sessionId}`);
    const connectedRef = ref(rtdb, '.info/connected');

    let isNewVisitForSession = false;
    
    // Controlliamo se la sessione corrente ha già incrementato il contatore visite
    const hasIncrementedStr = sessionStorage.getItem('has_incremented');
    if (!hasIncrementedStr) {
      isNewVisitForSession = true;
      sessionStorage.setItem('has_incremented', 'true');
    }

    // Listen to Firebase connection state
    const connectedUnsubscribe = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // We're connected (or reconnected)!
        // Imposta la sessione attiva
        set(userSessionRef, true);

        // Rimuovi la sessione quando l'utente si disconnette
        onDisconnect(userSessionRef).remove().catch(err => console.error(err));

        if (isNewVisitForSession) {
          // Incrementa counter totale visite (una volta per sessione)
          get(totalVisitsRef).then((snapshot) => {
            if (snapshot.exists()) {
              set(totalVisitsRef, increment(1));
            } else {
              // Inizializza il contatore partendo dal totale attuale o un numero di base
              set(totalVisitsRef, initialTotal + 1);
            }
          });
          isNewVisitForSession = false; // per non ripetere se c'è un reconnect
        }
      }
    });

    // Ascolta gli utenti attivi enumerando i figli di stats/sessions
    const sessionsRef = ref(rtdb, 'stats/sessions');
    const sessionsUnsubscribe = onValue(sessionsRef, (snapshot) => {
      let activeCount = 0;
      if (snapshot.exists()) {
        activeCount = snapshot.size;
      }
      setActiveUsers(activeCount > 0 ? activeCount : 1);
    });

    // Ascolta il contatore totale 
    const totalVisitsUnsubscribe = onValue(totalVisitsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        if (val > visitorCount) {
           setVisitorCount(val);
        } else if (val < initialTotal) {
           // Se il DB Firebase viene resettato accidentalmente e ha 0, mantieni initialTotal
           setVisitorCount(initialTotal);
        } else {
           setVisitorCount(val);
        }
      } else {
        // Initialize if not present
        set(totalVisitsRef, initialTotal);
      }
    });

    return () => {
      connectedUnsubscribe();
      sessionsUnsubscribe();
      totalVisitsUnsubscribe();
      
      if (isFirebaseConfigured && rtdb) {
        // Rimuovi al volo (utile per hot reload locale e disconnessioni fluide prima del onDisconnect)
        set(userSessionRef, null).catch(() => {});
      }
    };
  }, [initialTotal]);

  return { visitorCount, activeUsers };
}
