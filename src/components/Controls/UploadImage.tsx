'use client';

import React from 'react';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { addDecalToFirestore } from '@/utils/addDecalToFirestore';

type Props = {
  onUploadComplete: (url: string) => void;
};

export default function UploadImage({ onUploadComplete }: Props) {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImageToCloudinary(file);
      await addDecalToFirestore(file.name, url);
      console.log('✅ Uploaded and added to Firestore:', url);
      onUploadComplete(url);
    } catch (err) {
      console.error('❌ Upload or Firestore failed:', err);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <label htmlFor="upload">Upload Decal:</label>
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'block', marginTop: '0.5rem' }}
      />
    </div>
  );
}
