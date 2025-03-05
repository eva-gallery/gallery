'use client'
import React, { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const backendUrl = 'https://evagallery.b-cdn.net'; // process.env.NEXT_PUBLIC_BACKEND_URL
const imgUrl = 'https://beta.evagallery.eu';

interface Artwork {
  slug: string;
  name: string;
  artistName: string;
  thumbnailFilename?: string;
}

interface Exhibition {
  slug: string;
  name: string;
  artistName: string;
  activeRoomId?: string | null;
  artwork: Artwork;
}

const ArtworkGallery = ({ artworks }: { artworks: Exhibition[] }) => {
  const [startIndex, setStartIndex] = useState(0);
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
          <h1 className="mb-0">Exhibitions</h1>
        </Col>
        <Col xs="auto">
          <div className="position-relative">
            <div className="text-end">
              <a href="/exhibitions">All exhibitions &raquo;</a>
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
          {visibleArtworks.map((exhibition, index) => (
            <Col key={startIndex + index} xs={12} sm={6} md={3}>
              <Link href={`/exhibitions/${exhibition.slug}`} className="text-decoration-none">
                <Card className="artwork-card h-100 border-0 shadow-sm">
                  <div className="position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
                    <div className="position-absolute top-0 start-0 w-100 h-100">
                      <img
                        src={exhibition.artwork.thumbnailFilename 
                          ? `${imgUrl}/protected/assets/thumbnail/${exhibition.artwork.thumbnailFilename}`
                          : `${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(exhibition.artwork.slug)}`}
                        alt={exhibition.name}
                        className="w-100 h-100"
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
                    <Card.Title className="fs-6 text-truncate">{exhibition.name}</Card.Title>
                    <Card.Text className="text-muted small mb-0 text-truncate">
                      {exhibition.artistName}
                    </Card.Text>
                    {exhibition.activeRoomId && (
                      <span className="badge bg-primary mt-2">3D View Available</span>
                    )}
                  </Card.Body>
                </Card>
              </Link>
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
        
        .artwork-card:hover img {
          transform: scale(1.1);
        }

        img {
          transition: transform 0.3s ease;
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
