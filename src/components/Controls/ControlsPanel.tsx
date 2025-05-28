import React from 'react';
import './ControlsPanel.module.css';
import ColorPicker from './ColorPicker';

type ControlsPanelProps = {
  mode: string;
  onColorChange: (color: string) => void;
};

export default function ControlsPanel({ mode, onColorChange }: ControlsPanelProps) {
  return (
    <section className="controls">
      {mode === 'Color' && (
        <div className="controlSection">
          <ColorPicker onChange={onColorChange} />
        </div>
      )}
      {mode === 'Decal' && <div className="controlSection">{/* UploadImage */}</div>}
      {mode === 'Text' && <div className="controlSection">{/* TextEditor */}</div>}
    </section>
  );
}
