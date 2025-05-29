// utils/fetchPrices.ts
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function fetchPrices() {
  const colorsSnap = await getDocs(collection(db, 'colors'));
  const decalsSnap = await getDocs(collection(db, 'decals'));

  const colors = colorsSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    price: parseFloat(doc.data().price), // convert from string
  }));

  const decals = decalsSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    price: parseFloat(doc.data().price),
  }));

  return { colors, decals };
}
