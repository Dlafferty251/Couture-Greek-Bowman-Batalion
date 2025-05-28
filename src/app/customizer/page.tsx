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

  return (
    <div className={styles.container}>
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

      <main className={styles.main}>
        <div className={styles.toolbar}>
          {['front', 'side', 'back'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as View)}
              style={{
                background: view === v ? '#333' : '#eee',
                color: view === v ? '#fff' : '#000',
                margin: '0 0.25rem',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>

        <ControlsPanel mode={mode} />
        <TShirtCanvas mode={mode} view={view} />
      </main>
    </div>
  );
}
