'use client';
import React, { useEffect, useState } from 'react';
import { getPresetColors } from '@/utils/fetchPresetColors';

type PresetColor = {
  id: string;
  name: string;
  hex: string;
};

type ColorPickerProps = {
  onColorChange: (newColor: string) => void;
};

export default function ColorPicker({ onColorChange }: ColorPickerProps) {
  const [presetColors, setPresetColors] = useState<PresetColor[]>([]);
  const [customColor, setCustomColor] = useState<string>('#ffffff');

  useEffect(() => {
    const loadColors = async () => {
      try {
        const colors = await getPresetColors();
        setPresetColors(colors);
      } catch (err) {
        console.error('❌ Failed to load preset colors:', err);
      }
    };
    loadColors();
  }, []);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div style={{ padding: '1rem', color: 'white' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Preset Colors:</label>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {presetColors.map(c => (
          <button
            key={c.id}
            onClick={() => onColorChange(c.hex)}
            title={c.name}
            style={{
              backgroundColor: c.hex,
              width: '32px',
              height: '32px',
              border: c.hex === customColor ? '2px solid white' : '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      <label style={{ display: 'block', marginBottom: '0.25rem' }}>Custom Color:</label>
      <input
        type="color"
        value={customColor}
        onChange={handleCustomChange}
        style={{
          width: '100%',
          height: '2rem',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: customColor,
        }}
      />
    </div>
  );
}
