// GalleryImage.tsx
'use client'

import React from 'react';

interface GalleryImageProps {
  slug: string;
}

const GalleryImage = ({ slug }: GalleryImageProps) => {
  const backendUrl = 'https://evagallery.b-cdn.net'; // process.env.NEXT_PUBLIC_BACKEND_URL || 
  
  return (
    <div className="gallery-image-container mb-4">
      <img
        src={`${backendUrl}/public/gallery/image?slug=${encodeURIComponent(slug)}`}
        alt="Gallery"
        className="gallery-image rounded-lg shadow-md img-fluid h-auto object-cover block"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default GalleryImage;
