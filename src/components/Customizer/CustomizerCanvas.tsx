'use client';
import React from 'react';
import Image from 'next/image';
import styles from './CustomizerCanvas.module.css';

type CustomizerCanvasProps = {
  mode: string;
  view: 'front' | 'side' | 'back';
  shirtColor: string;
  decalImage?: string | null;
};

const imageMap: Record<'front' | 'side' | 'back', string> = {
  front: '/tshirt-front.png',
  side: '/tshirt-side.png',
  back: '/tshirt-back.png',
};

export default function TShirtCanvas({
  view,
  shirtColor,
  decalImage,
}: CustomizerCanvasProps) {
  const imageSrc = imageMap[view];

  return (
    <div className={styles.canvasWrapper}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={`T-shirt ${view}`}
          width={500}
          height={500}
          className={styles.tshirtImage}
          priority
        />

        <div className={styles.colorOverlay} style={{ backgroundColor: shirtColor }} />

        {decalImage && (
          <Image
            src={decalImage}
            alt="User decal"
            width={500}
            height={500}
            className={styles.decalOverlay}
            priority
          />
        )}
      </div>
    </div>
  );
}
