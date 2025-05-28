'use client';
import React, { useEffect, useState } from 'react';
import { getPresetColors } from '@/utils/fetchPresetColors';

type PresetColor = {
  id: string;
  name: string;
  hex: string;
};

type Props = {
  color: string;
  onChange: (newColor: string) => void;
};

export default function ColorPicker({ color, onChange }: Props) {
  const [presetColors, setPresetColors] = useState<PresetColor[]>([]);

  useEffect(() => {
    const loadColors = async () => {
      try {
        const colors = await getPresetColors();
        console.log('🎨 Fetched colors from Firestore:', colors); // <- Add this
        setPresetColors(colors);
      } catch (err) {
        console.error('Failed to load preset colors:', err);
      }
    };
    loadColors();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Preset Colors:</label>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {presetColors.map(c => (
          <button
            key={c.id}
            onClick={() => onChange(c.hex)}
            title={c.name}
            style={{
              backgroundColor: c.hex,
              width: '32px',
              height: '32px',
              border: c.hex === color ? '2px solid black' : '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      <label style={{ display: 'block', marginBottom: '0.25rem' }}>Custom Color:</label>
      <input
        type="color"
        value={color}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', height: '2rem', border: 'none', cursor: 'pointer' }}
      />
    </div>
  );
}
