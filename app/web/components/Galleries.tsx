'use client'
import React, { useState } from 'react';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Search } from 'lucide-react';

const backendUrl = 'https://evagallery.b-cdn.net'; // process.env.NEXT_PUBLIC_BACKEND_URL;

interface Artwork {
  slug: string;
  name: string;
  countryCode: string;
  address: string;
}

const ArtworkGrid = ({ artworks }: { artworks: Artwork[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Recommended galleries</h1>
        </Col>
        <Col xs="auto" className="d-none">
          <div className="position-relative">
            <Form.Control
              type="search"
              placeholder="Search galleries..."
              className="ps-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
            />
            <Search 
              size={18} 
              className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
            />
          </div>
        </Col>
      </Row>

      <Row className="g-4">
      {artworks.slice(0, 96).map((artwork, index) => (
        <Col key={index} xs={12} sm={6} md={3}>
          <a href={`/galleries/${artwork.slug}`} className="text-decoration-none">
          <Card className="artwork-card h-100 border-0 shadow-sm">
            <div className="image-wrapper position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
              <div className="image-container position-absolute top-0 start-0 w-100 h-100">
                <Card.Img
                  variant="top"
                  src={`${backendUrl}/public/gallery/thumbnail?slug=${encodeURIComponent(artwork.slug)}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/placeholder.png';
                  }}
                  alt={artwork.name}
                  className="w-100 h-100 transition-transform duration-300"
                />
              </div>
            </div>
            <Card.Body className="d-flex flex-row justify-content-between align-items-center px-3 py-2">
  <div className="flex-grow-1 me-2 overflow-hidden">
    <h5 className="card-title fs-6 mb-1 text-truncate text-dark">
      {(artwork.name)}
    </h5>
    <p className="text-muted small mb-0 text-truncate">
      {artwork.address}
    </p>
  </div>
  {artwork.countryCode && (
    <div className="flex-shrink-0">
      <span className={`fi fi-${artwork.countryCode.toLowerCase()} fs-6`}></span>
    </div>
  )}
</Card.Body>
          </Card></a>
        </Col>
      ))}
    </Row>

    <style jsx global>{`
      .artwork-card {
        transition: all 0.3s ease;
        cursor: pointer;
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
      }
    `}</style>
  </Container>
);
};

export default ArtworkGrid;
