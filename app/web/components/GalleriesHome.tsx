'use client'
import React, { useState } from 'react';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const backendUrl = 'https://evagallery.b-cdn.net'; // process.env.NEXT_PUBLIC_BACKEND_URL;

interface Artwork {
  slug: string;
  name: string;
  countryCode: string;
  artistName: string;
}

const ArtworkGallery = ({ artworks }: { artworks: Artwork[] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 4;

  const nextPage = () => {
    setStartIndex(prev => 
      prev + itemsPerPage >= artworks.length ? 0 : prev + itemsPerPage
    );
  };

  const previousPage = () => {
    setStartIndex(prev => 
      prev - itemsPerPage < 0 ? Math.max(0, artworks.length - itemsPerPage) : prev - itemsPerPage
    );
  };

  const visibleArtworks = artworks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container className="py-3">
      {/* Header Row */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Recommended galleries</h1>
        </Col>
        <Col xs="auto">
          <div className="position-relative">
            <div className="text-end">
              <a href="/galleries">All galleries &raquo;</a>
            </div>
          </div>
        </Col>
      </Row>

      {/* Gallery Section with hover state */}
      <div className="position-relative gallery-container">
        {/* Navigation Buttons */}
        <Button 
          variant="light" 
          className="navigation-button position-absolute start-20 top-50 translate-middle-y rounded-circle p-2 shadow-sm"
          onClick={previousPage}
          style={{ left: '-50px' }}
        >
          <ChevronLeft size={24} />
        </Button>

        <Button 
          variant="light" 
          className="navigation-button position-absolute end-20 top-50 translate-middle-y rounded-circle p-2 shadow-sm"
          onClick={nextPage}
          style={{ right: '-50px' }}
        >
          <ChevronRight size={24} />
        </Button>

        {/* Artworks Grid */}
        <Row className="g-4">
          {visibleArtworks.map((artwork, index) => (
            <Col key={startIndex + index} xs={12} sm={6} md={3}>
              <a href={`/galleries/${artwork.slug}`} className="text-decoration-none">
              <Card className="artwork-card h-100 border-0 shadow-sm">
                <div className="position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
                  <Card.Img
                    variant="top"
                    src={`${backendUrl}/public/gallery/image?slug=${encodeURIComponent(artwork.slug)}&width=600`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/placeholder.png';
                    }}
                    alt={artwork.name}
                    className="position-absolute top-0 start-0 w-100 h-100 object-cover transition-transform duration-300"
                  />
                </div>
                <Card.Body className="d-flex flex-row justify-content-between align-items-center px-3 py-2">
  <div className="flex-grow-1 me-2 overflow-hidden">
    <h5 className="card-title fs-6 mb-1 text-truncate text-dark">
      {(artwork.name)}
    </h5>
  </div>
  {artwork.countryCode && (
    <div className="flex-shrink-0">
      <span className={`fi fi-${artwork.countryCode.toLowerCase()} fs-6`}></span>
    </div>
  )}
</Card.Body>
              </Card>
              </a>
            </Col>
          ))}
        </Row>
      </div>

      {/* Add this style block at the end of your component */}
      <style jsx global>{`
        .gallery-container {
          padding: 0 0px;
        }

        .navigation-button {
          opacity: 0;
          transition: all 0.3s ease;
          background: white;
          z-index: 10;
        }

        .navigation-button:hover {
          background: #f8f9fa;
          transform: translateY(-50%) scale(1.1);
        }

        .gallery-container:hover .navigation-button {
          opacity: 1;
        }

        .artwork-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .artwork-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }

        .start-20 {
          left:30px !important; 
        } 
        .end-20 {
          right:30px !important; 
        }  
      `}</style>
    </Container>
  );
};

export default ArtworkGallery;
