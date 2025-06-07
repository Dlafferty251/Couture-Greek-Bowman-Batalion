'use client';
import React, { useEffect, useState } from 'react';
import MultizoneCanvas from './MultizoneCanvas';
import ColorZonePicker from './ColorZonePicker';
import { getPresetColors } from '@/utils/fetchPresetColors';
import styles from './multizone.module.css';

type PresetColor = {
  id: string;
  name: string;
  hex: string;
};

type ColorZone = {
  id: string;
  name: string;
  color: string;
};

type MultizoneCustomizerProps = {
  view: 'front' | 'side' | 'back';
};

const defaultZones: ColorZone[] = [
  { id: 'body', name: 'Body', color: '#ffffff' },
  { id: 'sleeves', name: 'Sleeves', color: '#ffffff' },
  { id: 'collar', name: 'Collar', color: '#ffffff' },
  { id: 'zipper', name: 'Zipper', color: '#ffffff' },
  { id: 'pockets', name: 'Pockets', color: '#ffffff' },
  { id: 'cuffs', name: 'Cuffs', color: '#ffffff' },
];

export default function MultizoneCustomizer({ view }: MultizoneCustomizerProps) {
  const [zones, setZones] = useState<ColorZone[]>(defaultZones);
  const [selectedZone, setSelectedZone] = useState<string>('body');
  const [presetColors, setPresetColors] = useState<PresetColor[]>([]);
  const [customColor, setCustomColor] = useState('#ffffff');

  useEffect(() => {
    getPresetColors().then(setPresetColors).catch(console.error);
  }, []);

  const handleColorChange = (color: string) => {
    setZones(prev => prev.map(z => (z.id === selectedZone ? { ...z, color } : z)));
  };

  return (
    <div className={styles.customizerWrapper}>
      <div className={styles.canvasPanel}>
        <MultizoneCanvas
          baseImage={`/apparel/jackets/jacket-${view}.png`}
          view={view}
          zones={zones}
        />
      </div>
      <div className={styles.controlPanel}>
        <label className={styles.dropdownLabel}>Zone:</label>
        <select
          value={selectedZone}
          onChange={e => setSelectedZone(e.target.value)}
          className={styles.dropdown}
        >
          {zones.map(zone => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>
        <ColorZonePicker
          onSelect={handleColorChange}
          customColor={customColor}
          setCustomColor={setCustomColor}
        />
      </div>
    </div>
  );
}
