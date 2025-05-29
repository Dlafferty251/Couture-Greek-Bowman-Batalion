import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export const fetchDecalsByCategory = async (
  category: string
): Promise<{ name: string; url: string }[]> => {
  const db = getFirestore(app);
  const decalRef = collection(db, 'decals');
  const q = query(decalRef, where('category', '==', category));
  const snapshot = await getDocs(q);
  const decals = snapshot.docs.map(doc => doc.data() as { name: string; url: string });
  console.log(`🎨 Decals for ${category}:`, decals);
  return decals;
};
