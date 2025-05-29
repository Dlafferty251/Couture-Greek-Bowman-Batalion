'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DraggableIcon.module.css';

type Props = {
  url: string;
  x: number;
  y: number;
  onUpdate: (x: number, y: number, scale: number, rotation: number) => void;
};

export default function DraggableDecal({ url, x, y, onUpdate }: Props) {
  const [position, setPosition] = useState({ x, y });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      setPosition({ x: newX, y: newY });
      onUpdate(newX, newY, scale, rotation);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={ref}
      className={styles.decal}
      style={{
        top: position.y,
        left: position.x,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
      onMouseDown={onMouseDown}
    >
      <Image src={url} alt="User decal" width={100} height={100} />
      {/* Control sliders */}
      <div className={styles.controls}>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={scale}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setScale(val);
            onUpdate(position.x, position.y, val, rotation);
          }}
        />
        <input
          type="range"
          min={-180}
          max={180}
          step={1}
          value={rotation}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setRotation(val);
            onUpdate(position.x, position.y, scale, val);
          }}
        />
      </div>
    </div>
  );
}
