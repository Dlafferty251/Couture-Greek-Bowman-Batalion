import React from 'react';
import './ControlsPanel.module.css';
import ColorPicker from './ColorPicker';
type ControlsPanelProps = {
  mode: string;
  color: string; // 👈 Add this
  onColorChange: (color: string) => void;
};

export default function ControlsPanel({ mode, color, onColorChange }: ControlsPanelProps) {
  return (
    <section className="controls">
      {mode === 'Color' && (
        <div className="controlSection">
          <ColorPicker color={color} onChange={onColorChange} /> {/* ✅ FIXED */}
        </div>
      )}
      {mode === 'Decal' && <div className="controlSection">{/* UploadImage */}</div>}
      {mode === 'Text' && <div className="controlSection">{/* TextEditor */}</div>}
    </section>
  );
}
