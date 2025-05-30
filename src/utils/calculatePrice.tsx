// utils/calculatePrice.ts
type Item = { name: string; price: number };

export function calculatePrice(selectedColor: Item | null, selectedDecals: Item[]): number {
  const colorPrice = selectedColor?.price ?? 0;
  const decalsPrice = selectedDecals.reduce((sum, decal) => sum + (decal.price ?? 0), 0);
  return parseFloat((colorPrice + decalsPrice).toFixed(2));
}
