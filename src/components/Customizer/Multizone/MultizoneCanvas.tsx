'use client';
import React from 'react';
import styles from './multizone.module.css';

type ColorZone = {
  id: string;
  name: string;
  color: string;
};

type MultizoneCanvasProps = {
  baseImage: string;
  zones: ColorZone[];
  view: 'front' | 'side' | 'back';
};

export default function MultizoneCanvas({ baseImage, zones, view }: MultizoneCanvasProps) {
  const imageSrc = baseImage.replace('-front.png', `-${view}.png`);

  return (
    <div className={styles.canvasWrapper}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={`Apparel ${view}`} className={styles.baseImage} />
        <svg className={styles.overlaySvg} viewBox="0 0 400 400">
          {zones.map((zone) => {
            switch (zone.id) {
              case 'body':
                return (
                  <rect
                    key={zone.id}
                    x="125"
                    y="100"
                    width="150"
                    height="220"
                    rx="15"
                    fill={zone.color}
                    opacity="0.65"
                  />
                );
              case 'sleeves':
                return (
                  <g key={zone.id}>
                    <rect
                      x="50"
                      y="110"
                      width="50"
                      height="210"
                      rx="20"
                      fill={zone.color}
                      opacity="0.65"
                    />
                    <rect
                      x="300"
                      y="110"
                      width="50"
                      height="210"
                      rx="20"
                      fill={zone.color}
                      opacity="0.65"
                    />
                  </g>
                );
              case 'collar':
                return (
                  <ellipse
                    key={zone.id}
                    cx="200"
                    cy="85"
                    rx="50"
                    ry="18"
                    fill={zone.color}
                    opacity="0.7"
                  />
                );
              case 'zipper':
                return (
                  <rect
                    key={zone.id}
                    x="195"
                    y="100"
                    width="10"
                    height="220"
                    fill={zone.color}
                    opacity="0.9"
                  />
                );
              case 'pockets':
                return (
                  <g key={zone.id}>
                    <rect
                      x="135"
                      y="220"
                      width="25"
                      height="20"
                      rx="5"
                      fill={zone.color}
                      opacity="0.7"
                    />
                    <rect
                      x="240"
                      y="220"
                      width="25"
                      height="20"
                      rx="5"
                      fill={zone.color}
                      opacity="0.7"
                    />
                  </g>
                );
              case 'cuffs':
                return (
                  <g key={zone.id}>
                    <rect
                      x="50"
                      y="315"
                      width="50"
                      height="20"
                      rx="8"
                      fill={zone.color}
                      opacity="0.8"
                    />
                    <rect
                      x="300"
                      y="315"
                      width="50"
                      height="20"
                      rx="8"
                      fill={zone.color}
                      opacity="0.8"
                    />
                  </g>
                );
              default:
                return null;
            }
          })}
        </svg>
      </div>
    </div>
  );
}
