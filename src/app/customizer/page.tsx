'use client';
import React, { useState } from 'react';
import ControlsPanel from '@/components/Controls/ControlsPanel';
import TShirtCanvas from '@/components/Customizer/CustomizerCanvas';
import styles from './customizer.module.css';

const modes = ['Color', 'Decal', 'Text'] as const;
type Mode = (typeof modes)[number];
type View = 'front' | 'side' | 'back';

export default function CustomizerPage() {
  const [mode, setMode] = useState<Mode>('Color');
  const [view, setView] = useState<View>('front');
  const [shirtColor, setShirtColor] = useState<string>('#ffffff');


  return (
    <div className={styles.container}>
      {/* Sidebar */}
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
<ControlsPanel
  mode={mode}
  color={shirtColor} // ✅ Add this line
  onColorChange={setShirtColor}
/>      </section>

      {/* Main Canvas */}
      <main className={styles.canvasArea}>
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
<TShirtCanvas mode={mode} view={view} shirtColor={shirtColor} />
      </main>
    </div>
  );
}
