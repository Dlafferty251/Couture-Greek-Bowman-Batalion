'use client';
import React, { useState } from 'react';
import ControlsPanel from '@/components/Controls/ControlsPanel';
import TShirtCanvas from '@/components/Customizer/CustomizerCanvas';
import uploadImageToCloudinary from '@/components/Controls/UploadImage';

import styles from './customizer.module.css';

const modes = ['Color', 'Decal', 'Text'] as const;
type Mode = (typeof modes)[number];
type View = 'front' | 'side' | 'back';

export default function CustomizerPage() {
  const [mode, setMode] = useState<Mode>('Color');
  const [view, setView] = useState<View>('front');
  const [shirtColor, setShirtColor] = useState<string>('#ffffff');
  const [uploadedDecal, setUploadedDecal] = useState<string | null>(null); // optional

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImageToCloudinary(file);
      console.log('✅ Uploaded decal URL:', url);
      setUploadedDecal(url);
    } catch (err) {
      console.error('❌ Upload failed:', err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
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

        {/* 👇 Show upload only in Decal mode */}
        {mode === 'Decal' && (
          <div style={{ marginTop: '1rem' }}>
            <label htmlFor="upload" style={{ fontSize: '0.9rem' }}>
              Upload Decal:
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'block', marginTop: '0.5rem' }}
            />
          </div>
        )}
      </aside>

      {/* Tool Panel */}
      <section className={styles.tools}>
        <ControlsPanel mode={mode} onColorChange={setShirtColor} />
      </section>

      {/* Main Canvas */}
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

        <TShirtCanvas
          mode={mode}
          view={view}
          shirtColor={shirtColor}
          // decalImage={uploadedDecal} // 🔧 Use this if you want to show decal on canvas
        />
      </main>
    </div>
  );
}
