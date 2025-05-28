import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
