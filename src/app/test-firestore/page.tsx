"use client";
import { useEffect } from "react";
import { getPresetColors } from "@/utils/fetchPresetColors";

export default function TestFirestorePage() {
  useEffect(() => {
    const test = async () => {
      try {
        console.log("🧪 Attempting to fetch colors from Firestore...");
        const colors = await getPresetColors();
        console.log("✅ Colors fetched:", colors);
      } catch (err) {
        console.error("❌ Firestore error:", err);
      }
    };
    test();
  }, []);

  return <p style={{ color: "white" }}>Testing Firestore… (Check Console)</p>;
}
