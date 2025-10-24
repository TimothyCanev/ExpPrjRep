// firebase.js
import { initializeApp } from "firebase/app";
// Ensure setDoc is imported!
import { getFirestore, doc, setDoc, FieldValue, increment } from "firebase/firestore"; // <-- Changed updateDoc to setDoc

const firebaseConfig = {
  // Access variables using process.env
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export async function incrementButtonPress(collectionName, documentId, fieldName) {
  const counterDocRef = doc(db, collectionName, documentId);
  try {
    // --- CHANGE THIS LINE ---
    await setDoc(counterDocRef, {
      [fieldName]: increment(1)
    }, { merge: true }); // <-- Added { merge: true }
    // --- END CHANGE ---

    console.log(`Counter for '${fieldName}' in '${collectionName}/${documentId}' incremented!`);
  } catch (error) {
    console.error(`Error incrementing counter for '${fieldName}':`, error);
  }
}
