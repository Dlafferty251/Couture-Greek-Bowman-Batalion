import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function addDecalToFirestore(name: string, imageUrl: string) {
  await addDoc(collection(db, 'decals'), {
    name,
    url: imageUrl,
  });
}
