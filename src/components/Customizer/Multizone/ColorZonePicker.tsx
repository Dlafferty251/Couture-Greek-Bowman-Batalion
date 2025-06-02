'use client';
import React, { useEffect, useState } from 'react';
import { getPresetColors } from '@/utils/fetchPresetColors';
import styles from './multizone.module.css';

type PresetColor = {
  id: string;
  name: string;
  hex: string;
};

type ColorZonePickerProps = {
  onSelect: (hex: string) => void;
  customColor: string;
  setCustomColor: (val: string) => void;
};

export default function ColorZonePicker({ onSelect, customColor, setCustomColor }: ColorZonePickerProps) {
  const [presetColors, setPresetColors] = useState<PresetColor[]>([]);

  useEffect(() => {
    getPresetColors().then(setPresetColors).catch(console.error);
  }, []);

  return (
    <div className={styles.pickerWrapper}>
      <h4 className={styles.heading}>Select Color</h4>
      <div className={styles.palette}>
        {presetColors.map(c => (
          <button
            key={c.id}
            title={c.name}
            onClick={() => onSelect(c.hex)}
            className={styles.colorSwatch}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
      <input
        type="color"
        value={customColor}
        onChange={(e) => setCustomColor(e.target.value)}
        className={styles.colorInput}
      />
      <button onClick={() => onSelect(customColor)} className={styles.applyBtn}>
        Apply Custom Color
      </button>
    </div>
  );
}
