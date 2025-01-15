'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Search } from 'lucide-react';

interface Artwork {
  nftData: {
    name: string;
    image: string;
  };
  artwork: {
    name: string;
  };
}

const ArtworkGrid = ({ artworks }: { artworks: Artwork[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Container fluid className="py-3 py-lg-4">
        {/* First row with two columns */}
        <Row className="mb-4 mb-lg-2">
          <Col md={6}>
            <div className="py-2 px-2 px-lg-0 h-100 rounded d-flex align-items-center">
              <div>
                <h2>NFT minting and presentation</h2>  
                <p>
                  The platform integrates wallet connection mechanisms and NFT functionality, 
                  allowing artists to incorporate blockchain technology into their collections. 
                  An AI-based recommendation engine provides personalized experiences for visitors, 
                  enhancing engagement with the artworks.
                </p>
                <a href="/admin/user/login">
                  <button className="btn btn-primary mb-4">
                    <span>Register now</span>
                  </button>
                </a>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="h-100 rounded">
              <div className="position-relative mb-3" style={{ height: '400px' }}>
                <Image
                  src="/images/nft.jpg"
                  alt="AI Art Protection"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Second row with responsive YouTube video */}
        <Row>
          <Col xs={12}>
            <div className="ratio ratio-16x9">
              <iframe 
                src="https://www.youtube.com/embed/lsyDyHHdPRM" 
                title="EVA Gallery YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-none">
        {/* Header Row */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 className="mb-0">NFTs</h1>
          </Col>
          <Col xs="auto">
            <div className="position-relative">
              <Form.Control
                type="search"
                placeholder="Search NFTs..."
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
          {artworks.slice(0, 24).map((artwork, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card className="artwork-card h-100 border-0 shadow-sm">
                <div className="image-wrapper position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
                  <div className="image-container position-absolute top-0 start-0 w-100 h-100">
                    <Card.Img
                      variant="top"
                      src={artwork.nftData.image}
                      alt={artwork.artwork.name}
                      className="w-100 h-100 transition-transform duration-300"
                    />
                  </div>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6 text-truncate">
                    {artwork.nftData.name}
                  </Card.Title>
                  <Card.Text className="text-muted small mb-0 text-truncate">
                    {artwork.artwork.name}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Styles */}
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
    </>
  );
};

export default ArtworkGrid;
