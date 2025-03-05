'use client';

import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import ArtworkLightbox, { LightboxArtwork } from './ArtworkLightbox';

const backendUrl = 'https://evagallery.b-cdn.net';
const imgUrl = 'https://beta.evagallery.eu';

interface ArtworkGridProps {
  artworks: LightboxArtwork[];
  seed: number;
}

const ArtworkGrid = ({ artworks, seed }: ArtworkGridProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const cleanFileName = (name: string) => {
    return name
      .replace(/\.(jpg|jpeg|png|gif|tif|tiff|kopie|bmp|webp)$/i, '')
      .replace(/[-_]/g, ' ')
      .trim();
  };

  return (
    <>
      <Container className="py-1 px-0">
        <Row className="g-4">
          {artworks.map((artwork, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card 
                className="artwork-card h-100 border-0 shadow-sm" 
                onClick={() => openLightbox(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="image-wrapper position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
                  <div className="image-container position-absolute top-0 start-0 w-100 h-100">
                    <Card.Img
                      variant="top"
                      src={artwork.thumbnailFilename 
                        ? `${imgUrl}/protected/assets/thumbnail/${artwork.thumbnailFilename}`
                        : `${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(artwork.slug)}`}
                      alt={artwork.name}
                      className="w-100 h-100 transition-transform duration-300"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/images/placeholder.png';
                      }}
                    />
                  </div>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6 text-truncate">{cleanFileName(artwork.name)}</Card.Title>
                  <Card.Text className="text-muted small mb-0 text-truncate">
                    {artwork.artistName}
                    {artwork.year ? ` (${artwork.year})` : ''}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Lightbox Component */}
        <ArtworkLightbox
          artworks={artworks}
          initialIndex={selectedIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
        />

        <style jsx global>{`
          .artwork-card {
            transition: all 0.3s ease;
          }

          .artwork-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
          }

          .image-container {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background-color: #f8f9fa;
          }
          
          .image-container img {
            object-fit: cover;
            object-position: center;
            transition: transform 0.3s ease;
          }
          
          .artwork-card:hover .image-container img {
            transform: scale(1.1);
          }
        `}</style>
      </Container>
    </>
  );
};

export default ArtworkGrid;
