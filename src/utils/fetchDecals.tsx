import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export const fetchDecals = async (): Promise<string[]> => {
  const db = getFirestore(app);
  const snapshot = await getDocs(collection(db, 'decals'));

  const urls = snapshot.docs.map(doc => doc.data().url).filter(Boolean);
  console.log('🖼️ Decal URLs from Firestore:', urls);
  return urls;
};
