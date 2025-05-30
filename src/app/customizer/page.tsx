'use client';
import React, { useEffect, useState } from 'react';
import ColorPicker from '@/components/Controls/ColorPicker';
import DecalPanel from '@/components/Controls/DecalPanel';
import CustomizerCanvas from '@/components/Customizer/CustomizerCanvas';
import styles from './customizer.module.css';
import { calculatePrice } from '@/utils/calculatePrice';
import { fetchPrices } from '@/utils/fetchPrice';

const modes = ['Color', 'Decal', 'Text'] as const;
type Mode = (typeof modes)[number];
type View = 'front' | 'side' | 'back';
type ApparelType = 'tshirt' | 'jacket' | 'sweatshirt' | 'longsleeve';

type CanvasDecal = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  src: string;
};

export default function CustomizerPage() {
  const [mode, setMode] = useState<Mode>('Color');
  const [view, setView] = useState<View>('front');
  const [apparelType, setApparelType] = useState<ApparelType>('tshirt');
  const [shirtColor, setShirtColor] = useState<string>('#ffffff');
  const [uploadedDecals, setUploadedDecals] = useState<string[]>([]); // for UI preview only
  const [placedDecals, setPlacedDecals] = useState<CanvasDecal[]>([]);
  const [allColors, setAllColors] = useState<any[]>([]);
  const [allDecals, setAllDecals] = useState<any[]>([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { colors, decals } = await fetchPrices();
      setAllColors(colors);
      setAllDecals(decals);
    }
    loadData();
  }, []);

  useEffect(() => {
    const currentColor = allColors.find(c => c.hex === shirtColor);

    const currentDecals = placedDecals
      .map(d => {
        const match = allDecals.find(a => a.url === d.src);
        return match ? { name: match.name, price: parseFloat(match.price) } : null;
      })
      .filter(Boolean) as { name: string; price: number }[];

    const total = calculatePrice(currentColor || null, currentDecals);
    setPrice(total);
  }, [shirtColor, placedDecals, allColors, allDecals]);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {modes.map(m => (
          <button
            key={m}
            className={mode === m ? styles.activeTab : styles.tab}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}

        <div className={styles.apparelGroup}>
          {['tshirt', 'jacket', 'sweatshirt', 'longsleeve'].map(type => (
            <button
              key={type}
              className={apparelType === type ? styles.activeTab : styles.tab}
              onClick={() => setApparelType(type as ApparelType)}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </aside>

      <section className={styles.tools}>
        {mode === 'Color' && <ColorPicker onColorChange={setShirtColor} />}
        {mode === 'Decal' && <DecalPanel onDecalSelect={setUploadedDecals} />}
        {mode === 'Text' && <p style={{ color: 'white' }}>Text tool coming soon...</p>}
      </section>

      <main className={styles.canvasArea}>
        <div className={styles.toolbar}>
          {['front', 'side', 'back'].map(v => (
            <button
              key={v}
              onClick={() => setView(v as View)}
              className={view === v ? styles.viewActive : styles.viewBtn}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>

<CustomizerCanvas
  mode={mode}
  view={view}
  shirtColor={shirtColor}
  decalImage={uploadedDecals[uploadedDecals.length - 1] || null}
  decals={placedDecals}
  setDecals={setPlacedDecals}
  apparelType={apparelType} // 👈 THIS IS WHAT YOU'RE MISSING
/>


        <div className={styles.creativeBadge}>
          <div className={styles.glowRing} />
          <p>
            🎨 Studio Mode: <span className={styles.shimmerText}>Activated</span>
          </p>
          <div className={styles.priceTag}>💰 Total: ${price.toFixed(2)}</div>
        </div>
      </main>
    </div>
  );
}
