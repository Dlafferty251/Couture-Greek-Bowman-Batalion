// Description: This function adds a decal to the Firestore meta database.

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function addDecalToFirestore(name: string, imageUrl: string) {
  await addDoc(collection(db, "decals"), {
    name,
    imageUrl,
    createdAt: Timestamp.now(),
  });
}