import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, increment, collection, getDocs } from "firebase/firestore";
import emailjs from '@emailjs/browser';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

emailjs.init('AltXM1q-ysbqGGSFe'); // EmailJS public key

export { db };

export async function incrementButtonPress(collectionName, documentId, fieldName) {
  const counterDocRef = doc(db, collectionName, documentId);
  try {
    await setDoc(counterDocRef, {
      [fieldName]: increment(1)
    }, { merge: true });

    console.log(`Counter for '${fieldName}' in '${collectionName}/${documentId}' incremented!`);
  } catch (error) {
    console.error(`Error incrementing counter for '${fieldName}':`, error);
  }
}

export async function getUrinalData() {
  try {
    const urinalsCollection = collection(db, 'devices');
    const snapshot = await getDocs(urinalsCollection);
    
    const urinalData = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id || doc.id,
        location: data.location || 'Unknown Location',
        uses: data.uses || 0,
        maxUses: data.maxUses || 5000,
        status: data.status || 'good',
        lastMaintenance: data.lastMaintenance || 'N/A',
        maintPhone: data.maintPhone || '',
        email: data.email || ''
      };
    });
    
    return urinalData;
  } catch (error) {
    console.error('Error fetching urinal data from Firebase:', error);
    return []; // Return empty array on error
  }
}

// function to reset urinal counter
export async function resetUrinalCounter(urinalId) {
  try {
    const urinalDocRef = doc(db, 'devices', urinalId);
    await setDoc(urinalDocRef, {
      uses: 0,
      lastMaintenance: new Date().toISOString().split('T')[0] // Set to today's date
    }, { merge: true });
    
    console.log(`Counter for urinal '${urinalId}' has been reset!`);
    return true;
  } catch (error) {
    console.error(`Error resetting counter for urinal '${urinalId}':`, error);
    return false;
  }
}

// Function to send maintenance alert via email
export async function sendMaintenanceAlert(deviceId, uses, maxUses, maintPhone, location, email) {
  const usagePercent = Math.round((uses / maxUses) * 100);
  
  console.log('🔍 Checking device:', { deviceId, uses, maxUses, usagePercent, email });
  
  if (usagePercent >= 80 && email) {
    console.log('🚨 ALERT TRIGGERED! Sending email notification...');
    
    try {
      // Add a small delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = await emailjs.send(
        'Viscount_Waterless',  // service ID
        'template_sq5g4r7', //template ID
        {
          to_email: email,
          device_id: deviceId,
          location: location,
          usage_percent: usagePercent,
          uses: uses,
          max_uses: maxUses,
          phone: maintPhone
        }
      );
      
      console.log('✅ Email alert sent successfully to:', email, result);
      return true;
    } catch (error) {
      console.error('❌ Error sending email alert:', error);
      return false;
    }
  } else if (usagePercent >= 80 && !email) {
    console.log('⚠️ Alert needed but no email provided for device:', deviceId);
  } else {
    console.log('ℹ️ No alert needed. Usage:', usagePercent + '%');
  }
  return false;
}