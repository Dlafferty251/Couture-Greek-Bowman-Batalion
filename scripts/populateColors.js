// scripts/populateColors.js
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Make sure the path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const colors = [
  { name: "Black", hex: "#000000", price: "2.50" },
  { name: "White", hex: "#FFFFFF", price: "2.50" },
  { name: "Crimson", hex: "#DC143C", price: "2.50" },
  { name: "Gold", hex: "#FFD700", price: "2.50" },
  { name: "Royal Blue", hex: "#4169E1", price: "2.50" },
  { name: "Purple", hex: "#800080", price: "2.50" },
  { name: "Navy", hex: "#000080", price: "2.50" },
  { name: "Forest Green", hex: "#228B22", price: "2.50" },
  { name: "Maroon", hex: "#800000", price: "2.50" },
  { name: "Cream", hex: "#FFFDD0", price: "2.50" },
  { name: "Silver", hex: "#C0C0C0", price: "2.50" },
  { name: "Columbia Blue", hex: "#C4D8E2", price: "2.50" },
  { name: "Old Gold", hex: "#CFB53B", price: "2.50" },
  { name: "Ice Gray", hex: "#D3D3D3", price: "2.50" }
];

async function addColors() {
  const batch = db.batch();
  const ref = db.collection('colors');

  colors.forEach((color) => {
    const docRef = ref.doc(color.name); // 🔥 Make name the doc ID so it's readable
    batch.set(docRef, color);
  });

  await batch.commit();
  console.log(`✅ Added ${colors.length} colors to Firebase.`);
}

addColors().catch(console.error);
