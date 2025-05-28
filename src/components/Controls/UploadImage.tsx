'use client';

import { useState } from 'react';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { addDecalToFirestore } from '../../utils/addDecalToFirestore';

export default function DecalUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');

  const handleUpload = async () => {
    if (!file || !name) return alert('Please select a file and enter a name.');
    try {
      const url = await uploadImageToCloudinary(file);
      await addDecalToFirestore(name, url);
      alert('Decal uploaded successfully!');
      setFile(null);
      setName('');
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Decal name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload Decal</button>
    </div>
  );
}
