'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { RotateCw, Trash2, Copy } from 'lucide-react';
import styles from './CustomizerCanvas.module.css';

type CustomizerCanvasProps = {
  mode: string;
  view: 'front' | 'side' | 'back';
  shirtColor: string;
  decalImage?: string | null;
  decals: Decal[];
  setDecals: React.Dispatch<React.SetStateAction<Decal[]>>;
};

type Decal = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  src: string;
};

const imageMap: Record<'front' | 'side' | 'back', string> = {
  front: '/tshirt-front.png',
  side: '/tshirt-side.png',
  back: '/tshirt-back.png',
};

export default function CustomizerCanvas({
  view,
  shirtColor,
  decalImage,
  decals,
  setDecals,
}: CustomizerCanvasProps) {
  const imageSrc = imageMap[view];
  const canvasRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<Decal[][]>([[]]);
  const [selectedDecal, setSelectedDecal] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const addToHistory = (newDecals: Decal[]) => {
    setHistory(prev => [...prev, newDecals]);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!decalImage || !canvasRef.current) return;
    if ((e.target as HTMLElement).closest(`.${styles.decalContainer}`)) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newDecal: Decal = {
      id: Date.now(),
      x: Math.max(0, e.clientX - rect.left - 50),
      y: Math.max(0, e.clientY - rect.top - 50),
      width: 100,
      height: 100,
      rotation: 0,
      src: decalImage,
    };

    const updated = [...decals, newDecal];
    setDecals(updated);
    addToHistory(updated);
    setSelectedDecal(newDecal.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const files = Array.from(e.dataTransfer.files);

    files.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = event => {
          const newDecal: Decal = {
            id: Date.now() + index,
            x: Math.max(0, e.clientX - rect.left - 50),
            y: Math.max(0, e.clientY - rect.top - 50 + index * 20),
            width: 100,
            height: 100,
            rotation: 0,
            src: event.target?.result as string,
          };

          setDecals(prev => {
            const updated = [...prev, newDecal];
            addToHistory(updated);
            return updated;
          });
          setSelectedDecal(newDecal.id);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault();
      setHistory(prev => {
        if (prev.length > 1) {
          const newHistory = [...prev];
          newHistory.pop();
          setDecals(newHistory[newHistory.length - 1]);
          return newHistory;
        }
        return prev;
      });
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (selectedDecal) {
        deleteDecal(selectedDecal);
      }
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyDown(e);
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [selectedDecal]);

  const updateDecal = (id: number, changes: Partial<Decal>) => {
    const updated = decals.map(d => (d.id === id ? { ...d, ...changes } : d));
    setDecals(updated);
    addToHistory(updated);
  };

  const rotateDecal = (id: number) => {
    updateDecal(id, { rotation: (decals.find(d => d.id === id)?.rotation || 0) + 90 });
  };

  const deleteDecal = (id: number) => {
    const updated = decals.filter(d => d.id !== id);
    setDecals(updated);
    addToHistory(updated);
    setSelectedDecal(null);
  };

  const duplicateDecal = (id: number) => {
    const decal = decals.find(d => d.id === id);
    if (decal) {
      const newDecal: Decal = {
        ...decal,
        id: Date.now(),
        x: decal.x + 20,
        y: decal.y + 20,
      };
      const updated = [...decals, newDecal];
      setDecals(updated);
      addToHistory(updated);
      setSelectedDecal(newDecal.id);
    }
  };

  return (
    <div className={styles.canvasWrapper}>
      <div
        className={`${styles.imageContainer} ${dragOver ? styles.dragOver : ''}`}
        ref={canvasRef}
        onClick={handleCanvasClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <img src={imageSrc} alt={`T-shirt ${view}`} className={styles.tshirtImage} />
        <div
          className={styles.colorOverlay}
          style={{
            backgroundColor: shirtColor,
            maskImage: `url(${imageSrc})`,
            WebkitMaskImage: `url(${imageSrc})`,
          }}
        />

        {decals.map(decal => (
          <Rnd
            key={decal.id}
            className={`${styles.decalContainer} ${selectedDecal === decal.id ? styles.selected : ''}`}
            size={{ width: decal.width, height: decal.height }}
            position={{ x: decal.x, y: decal.y }}
            bounds="parent"
            onDragStart={() => setSelectedDecal(decal.id)}
            onDragStop={(_, d) => updateDecal(decal.id, { x: d.x, y: d.y })}
            onResizeStart={() => setSelectedDecal(decal.id)}
            onResizeStop={(_, __, ref, ___, pos) =>
              updateDecal(decal.id, {
                x: pos.x,
                y: pos.y,
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
              })
            }
            style={{
              transform: `rotate(${decal.rotation}deg)`,
              transformOrigin: 'center',
            }}
          >
            <img
              src={decal.src}
              alt="Decal"
              className={styles.decalImage}
              onClick={e => {
                e.stopPropagation();
                setSelectedDecal(decal.id);
              }}
            />
            {selectedDecal === decal.id && (
              <div className={styles.decalControls}>
                <button onClick={e => { e.stopPropagation(); rotateDecal(decal.id); }}>
                  <RotateCw size={14} />
                </button>
                <button onClick={e => { e.stopPropagation(); duplicateDecal(decal.id); }}>
                  <Copy size={14} />
                </button>
                <button onClick={e => { e.stopPropagation(); deleteDecal(decal.id); }}>
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </Rnd>
        ))}

        {dragOver && <div className={styles.dropIndicator}><p>Drop images here to add decals</p></div>}
      </div>
    </div>
  );
}
