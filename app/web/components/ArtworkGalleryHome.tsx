'use client'
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const ArtworkGallery = ({ artworks }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerPage = 8;

  const nextPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStartIndex(prev => 
      prev + itemsPerPage >= artworks.length ? 0 : prev + itemsPerPage
    );
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const previousPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStartIndex(prev => 
      prev - itemsPerPage < 0 ? Math.max(0, artworks.length - itemsPerPage) : prev - itemsPerPage
    );
    setTimeout(() => setIsTransitioning(false), 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextPage();
    }, 7000);

    return () => clearInterval(interval);
  }, [startIndex, isTransitioning]);

  const visibleArtworks = artworks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container className="py-3">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Artworks</h1>
        </Col>
        <Col xs="auto">
          <div className="top-50 start-0 translate-bottom-y ms-2 text-muted">
            <a href="/artworks">All artworks &raquo;</a>
          </div>
        </Col>
      </Row>

      <div className="position-relative gallery-container">
        <Button 
          variant="light" 
          className="navigation-button position-absolute start-20 top-50 translate-middle-y rounded-circle p-2 shadow-sm"
          onClick={previousPage}
          disabled={isTransitioning}
        >
          <ChevronLeft size={24} />
        </Button>

        <Button 
          variant="light" 
          className="navigation-button position-absolute end-20 top-50 translate-middle-y rounded-circle p-2 shadow-sm"
          onClick={nextPage}
          disabled={isTransitioning}
        >
          <ChevronRight size={24} />
        </Button>

        <div className="artwork-grid-container">
          <Row className="g-4">
            {visibleArtworks.map((artwork, index) => (
              <Col 
                key={startIndex + index} 
                xs={12} sm={6} md={3}
              >
                <Card className="artwork-card border-0 shadow-sm h-100">
                  <div className="image-wrapper">
                    <a href={`/artworks/${artwork.slug}`} className="image-link">  
                      <Card.Img
                        variant="top"
                        src={`${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(artwork.slug)}`} 
                        alt={artwork.name}
                        className="artwork-image"
                      />
                    </a>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-6 text-truncate">{artwork.name}</Card.Title>
                    <Card.Text className="text-muted small mb-0 text-truncate">
                      {artwork.artistName}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <style jsx global>{`
        .gallery-container {
          padding: 0;
          overflow: hidden;
        }

        .navigation-button {
          opacity: 0;
          transition: all 0.4s ease;
          background: white;
          z-index: 10;
        }

        .navigation-button:hover:not(:disabled) {
          background: #f8f9fa;
          transform: translateY(-50%) scale(1.1);
        }

        .navigation-button:disabled {
          cursor: default;
        }

        .gallery-container:hover .navigation-button:not(:disabled) {
          opacity: 0.8;
        }

        .artwork-card {
          transition: all 0.4s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          transform-origin: center center;
          background: white;
        }

        .artwork-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 100%;
          overflow: hidden;
        }

        .image-link {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .artwork-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.4s ease;
          background-color: #f8f9fa;
        }

        .artwork-card:hover .artwork-image {
          /* transform: scale(1.05); */
        }
        
        .start-20 {
          left: 30px !important; 
        } 

        .end-20 {
          right: 30px !important; 
        }

        @media (min-width: 768px) {
          .col-md-3 {
            flex: 0 0 25%;
            max-width: 25%;
          }
        }
      `}</style>
    </Container>
  );
};

export default ArtworkGallery;