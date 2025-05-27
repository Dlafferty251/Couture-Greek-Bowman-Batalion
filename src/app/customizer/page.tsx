"use client";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const saveMockup = async () => {
  try {
    await addDoc(collection(db, "designs"), {
      userEmail: "test@couturegreek.com",
      shirtColor: "black",
      decalUrl: "https://example.com/decal.png",
      createdAt: new Date(),
    });
    alert("🔥 Design saved!");
  } catch (err) {
    console.error("Error saving mockup:", err);
    alert("Something went wrong.");
  }
};

export default function CustomizerPage() {
  return (
    <main>
      <h1>Couture Greek Customizer</h1>
      <button onClick={saveMockup} style={{ padding: "10px", marginTop: "1rem" }}>
        Save Design to Firebase
      </button>
    </main>
  );
}
