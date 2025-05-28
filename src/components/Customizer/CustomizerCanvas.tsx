'use client';
import React from 'react';
import Image from 'next/image';
import styles from './CustomizerCanvas.module.css';

type CustomizerCanvasProps = {
  mode: string;
  view: 'front' | 'side' | 'back';
};

const imageMap: Record<'front' | 'side' | 'back', string> = {
  front: '/tshirt-front.png',
  side: '/tshirt-side.png',
  back: '/tshirt-back.png',
};

export default function TShirtCanvas({ mode, view }: CustomizerCanvasProps) {
const imageSrc = imageMap[view] || imageMap.front;

  if (!imageSrc) return null; // 🛑 Don't render if invalid view

  return (
    <div className={styles.canvas}>
<Image
  src={imageSrc}
  alt={`T-shirt ${view}`}
  className={styles.image}
  width={500}
  height={500}
  priority
/>

    </div>
  );
}
