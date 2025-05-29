'use client';
import React, { useState } from 'react';
import ColorPicker from '@/components/Controls/ColorPicker';
import DecalPanel from '@/components/Controls/DecalPanel';
import TShirtCanvas from '@/components/Customizer/CustomizerCanvas';
import styles from './customizer.module.css';

const modes = ['Color', 'Decal', 'Text'] as const;
type Mode = (typeof modes)[number];
type View = 'front' | 'side' | 'back';

export default function CustomizerPage() {
  const [mode, setMode] = useState<Mode>('Color');
  const [view, setView] = useState<View>('front');
  const [shirtColor, setShirtColor] = useState<string>('#ffffff');
  const [uploadedDecal, setUploadedDecal] = useState<string | null>(null);
  

  return (
    <div className={styles.container}>
      {/* Sidebar with mode tabs */}
      <aside className={styles.sidebar}>
        {modes.map((m) => (
          <button
            key={m}
            className={mode === m ? styles.activeTab : styles.tab}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}
      </aside>

      {/* Tool Panel */}
      <section className={styles.tools}>
        {mode === 'Color' && (
          <ColorPicker onColorChange={setShirtColor} />
        )}
        {mode === 'Decal' && (
          <DecalPanel onDecalSelect={setUploadedDecal} />
        )}
        {mode === 'Text' && (
          <p style={{ color: 'white' }}>Text tool coming soon...</p>
        )}
      </section>

      {/* Main Canvas */}
      <main className={styles.canvasArea}>
        {/* View Toggle Toolbar */}
        <div className={styles.toolbar}>
          {['front', 'side', 'back'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as View)}
              className={view === v ? styles.viewActive : styles.viewBtn}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>

        <TShirtCanvas
          mode={mode}
          view={view}
          shirtColor={shirtColor}
          decalImage={uploadedDecal}
        />
<div className={styles.creativeBadge}>
  <div className={styles.glowRing} />
  <p>🎨 Studio Mode: <span className={styles.shimmerText}>Activated</span></p>
</div>


      </main>


    </div>
  );
}
