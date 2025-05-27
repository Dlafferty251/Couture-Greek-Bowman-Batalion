import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNzQRq5rp3SVhht-W1ecRx0M4lCBWIy44",
  authDomain: "couture-greek.firebaseapp.com",
  projectId: "couture-greek",
  storageBucket: "couture-greek.firebasestorage.app",
  messagingSenderId: "14472606701",
  appId: "1:14472606701:web:48f49da7b1480282112de4",
  measurementId: "G-4K8TM3VZL1" // Optional – keep if you plan to use analytics later
};

// Prevent re-initializing on hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firestore + Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

// ❌ REMOVE this line 👇 unless you wrap it in a `typeof window !== "undefined"`
/*
import { getAnalytics } from "firebase/analytics";
if (typeof window !== "undefined") {
  getAnalytics(app);
}
*/
