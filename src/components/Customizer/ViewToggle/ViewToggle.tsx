import React from 'react';

type View = 'front' | 'side' | 'back';

interface ViewToggleProps {
  currentView: View;
  onChange: (view: View) => void;
}

export default function ViewToggle({ currentView, onChange }: ViewToggleProps) {
  const views: View[] = ['front', 'side', 'back'];

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      {views.map(view => (
        <button
          key={view}
          onClick={() => onChange(view)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: currentView === view ? '#333' : '#ddd',
            color: currentView === view ? '#fff' : '#000',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {view.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
