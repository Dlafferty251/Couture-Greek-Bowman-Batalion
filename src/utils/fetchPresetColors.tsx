import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase"; // your Firebase config

type PresetColor = {
  id: string;
  name: string;
  hex: string;
};

export async function getPresetColors(): Promise<PresetColor[]> {
  const querySnapshot = await getDocs(collection(db, "colors"));
  return querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      hex: data.hex,
    };
  });
}
