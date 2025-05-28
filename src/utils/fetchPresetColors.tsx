import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase"; // your Firebase config

export async function getPresetColors() {
  const querySnapshot = await getDocs(collection(db, "colors"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}
