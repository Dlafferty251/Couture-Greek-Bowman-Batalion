// src/components/Controls/ColorPicker.tsx
'use client';
import React from 'react';

type Props = {
  onChange: (color: string) => void;
};

export default function ColorPicker({ onChange }: Props) {
  return (
    <div style={{ padding: '1rem' }}>
      <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>
        Pick a shirt color:
      </label>
      <input
        type="color"
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', height: '2.5rem', border: 'none', cursor: 'pointer' }}
      />
    </div>
  );
}
