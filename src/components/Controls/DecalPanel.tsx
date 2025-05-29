'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './DecalPanel.module.css';
import { fetchDecalsByCategory } from '@/utils/fetchDecalsByCategory';

type Props = {
  onDecalSelect: (url: string) => void;
};

type Decal = { name: string; url: string };

export default function DecalPanel({ onDecalSelect }: Props) {
  const [decals, setDecals] = useState<Decal[]>([]);
  const [activeCategory, setActiveCategory] = useState('APA');

  useEffect(() => {
    const loadCategoryDecals = async () => {
      try {
        const urls = await fetchDecalsByCategory(activeCategory);
        console.log(`🎨 Decals for ${activeCategory}:`, urls);
        setDecals(urls);
      } catch (err) {
        console.error(`❌ Failed to fetch decals for ${activeCategory}:`, err);
      }
    };

    loadCategoryDecals();
  }, [activeCategory]);

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

      <div className={styles.categoryButtons}>
        {['AKA', 'DELTA', 'KAPPA', 'APA', 'OMEGA', 'ZETA', 'SGRHO', 'IOTA'].map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              activeCategory === category ? styles.active : ''
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {decals
          .filter(decal => typeof decal.url === 'string' && decal.url.startsWith('http'))
          .map((decal, idx) => (
            <div key={idx} className={styles.previewBox}>
              <Image
                src={decal.url}
                width={100}
                height={100}
                className={styles.decalThumb}
                alt={decal.name || `Decal ${idx}`}
                onClick={() => onDecalSelect(decal.url)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
