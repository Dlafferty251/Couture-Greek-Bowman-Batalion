import React from 'react';
import './ControlsPanel.module.css';

type ControlsPanelProps = { mode: string };

export default function ControlsPanel({ mode }: ControlsPanelProps) {
  return (
    <section className="controls">
      {mode === 'Color' && <div className="controlSection">{/* ColorPicker component */}</div>}
      {mode === 'Decal' && <div className="controlSection">{/* UploadImage component */}</div>}
      {mode === 'Text' && <div className="controlSection">{/* TextEditor component */}</div>}
    </section>
  );
}