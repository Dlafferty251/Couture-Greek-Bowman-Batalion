'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './DecalPanel.module.css';
import { fetchDecals } from '@/utils/fetchDecals'; // ✅ Now being used

type Props = {
  onDecalSelect: (url: string) => void;
};

export default function DecalPanel({ onDecalSelect }: Props) {
  const [decals, setDecals] = useState<string[]>([]);

  useEffect(() => {
    const loadDecals = async () => {
      try {
        const urls = await fetchDecals();
        setDecals(urls);
      } catch (err) {
        console.error('❌ Failed to fetch decals:', err);
      }
    };

    loadDecals();
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        onDecalSelect(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.decalPanel}>
      <label className={styles.uploadLabel}>
        Upload Decal:
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className={styles.uploadInput}
        />
      </label>

      <div className={styles.grid}>
        {decals.map((url, idx) => (
          <div key={idx} className={styles.previewBox}>
            <Image
              src={url}
              width={100}
              height={100}
              className={styles.decalThumb}
              alt={`Decal ${idx}`}
              onClick={() => onDecalSelect(url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
