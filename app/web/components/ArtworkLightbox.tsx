'use client';

import React, { useState, useEffect, useCallback } from 'react';

export interface LightboxArtwork {
  id: string;
  name: string;
  slug: string;
  artistName: string;
  year?: string | null;
  thumbnailFilename?: string;
  imageFilename?: string;
}

interface LightboxProps {
  artworks: LightboxArtwork[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

const backendUrl = 'https://evagallery.b-cdn.net';
const imgUrl = 'https://beta.evagallery.eu';

const cleanFileName = (name: string) => {
    return name
      .replace(/\.(jpg|jpeg|png|gif|tif|tiff|kopie|bmp|webp)$/i, '')
      .replace(/[-_]/g, ' ')
      .trim();
  };

const ArtworkLightbox: React.FC<LightboxProps> = ({ 
  artworks, 
  initialIndex = 0, 
  isOpen, 
  onClose 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Reset to initial index when the lightbox opens or initialIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);
  
  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
    );
  }, [artworks.length]);
  
  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
    );
  }, [artworks.length]);
  
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleClickOutside = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
        );
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => 
          prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
        );
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleClose, artworks.length]);
  
  if (!isOpen) return null;
  
  const currentArtwork = artworks[currentIndex];
  
  if (!currentArtwork) return null;
  
  return (
    <div 
      className="lightbox-overlay" 
      onClick={handleClickOutside}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
    >
      {/* Close button */}
      <button 
        onClick={handleClose}
        className="close-button"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '30px',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        &times;
      </button>
      
      {/* Navigation */}
      <div 
        className="lightbox-navigation"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '0 20px'
        }}
      >
        <button 
          onClick={handlePrev}
          className="nav-button prev"
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '30px',
            cursor: 'pointer',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}
        >
          &#10094;
        </button>
        <button 
          onClick={handleNext}
          className="nav-button next"
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '30px',
            cursor: 'pointer',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}
        >
          &#10095;
        </button>
      </div>
      
      {/* Image container */}
      <div 
        className="lightbox-content" 
        style={{
          position: 'relative',
          maxWidth: '90%',
          maxHeight: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div 
          className="image-container"
          style={{
            maxHeight: 'calc(100vh - 220px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <img 
            src={currentArtwork.imageFilename 
              ? `${imgUrl}/protected/assets/thumbnail/${currentArtwork.imageFilename}`
              : `${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(currentArtwork.slug)}`}
            alt={currentArtwork.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/images/placeholder.png';
            }}
          />
        </div>
        
        {/* Artwork details */}
        <div 
          className="artwork-details"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '15px 20px',
            borderRadius: '5px',
            width: '100%',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <h3 style={{ margin: '0 0 5px', fontSize: '20px' }}>{cleanFileName(currentArtwork.name)}</h3>
          <p style={{ margin: '0', fontSize: '16px' }}>
            by {currentArtwork.artistName}
            {currentArtwork.year && ` (${currentArtwork.year})`}
          </p>
          <div 
            className="counter" 
            style={{ 
              marginTop: '10px', 
              fontSize: '14px', 
              color: '#ccc' 
            }}
          >
            {currentIndex + 1} of {artworks.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkLightbox;
