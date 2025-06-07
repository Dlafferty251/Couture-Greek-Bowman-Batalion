'use client';
import React, { useEffect, useState } from 'react';
import { getPresetColors } from '@/utils/fetchPresetColors';

/**
 * Represents a single color preset pulled from Firebase.
 */
type PresetColor = {
  id: string;
  name: string;
  hex: string;
};

/**
 * Props for the ColorPicker component.
 * @param onColorChange - Callback when the user selects a color.
 */
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
        console.log('🎨 Preset colors loaded:', colors);
      } catch (err) {
        console.error('❌ Failed to load preset colors:', err);
      }
    };
    loadColors();
  }, []);

  const handleColorChange = (color: string) => {
    setCustomColor(color);
    onColorChange(color);
    console.log(`🟢 Apparel color set to: ${color}`);
  };

  return (
    <div style={{ padding: '1rem', color: 'white' }} data-testid="color-picker">
      <label>Preset Colors:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {presetColors.map(c => (
          <button
            key={c.id}
            title={c.name}
            data-testid={`preset-${c.name}`}
            onClick={() => handleColorChange(c.hex)}
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

      <label htmlFor="custom-color">Custom Color:</label>
      <input
        id="custom-color"
        type="color"
        value={customColor}
        onChange={e => handleColorChange(e.target.value)}
        data-testid="custom-color"
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
