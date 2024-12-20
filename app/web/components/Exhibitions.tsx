'use client'
import React, { useState } from 'react';
import { format, isValid } from 'date-fns';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Search } from 'lucide-react';
import Image from 'next/image';

const backendUrl = 'https://evagallery.b-cdn.net'; // process.env.NEXT_PUBLIC_BACKEND_URL || 

interface Exhibition {
  slug: string;
  name: string;
  fromDate: string | Date;
  toDate: string | Date;
  curator: string;
  gallery: {
    name: string;
    slug: string;
  };
  artwork: {
    name: string;
    slug: string;
  };
  activeRoomId: string | null;
}

interface ExhibitionsGridProps {
  exhibitions: Exhibition[];
}

const ExhibitionsGrid: React.FC<ExhibitionsGridProps> = ({ exhibitions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (date: string | Date) => {
    const parsedDate = new Date(date);
    return isValid(parsedDate) ? format(parsedDate, 'dd.MM.yyyy') : '';
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Exhibitions</h1>
        </Col>
        <Col xs="auto">
          <div className="position-relative">
            <Form.Control
              type="search"
              placeholder="Search exhibitions..."
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
        {exhibitions.slice(0, 24).map((exhibition, index) => (
          <Col key={index} xs={12} sm={6} md={3}>
            <Card className="artwork-card h-100 border-0 shadow-sm">
              <div className="image-wrapper position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
                <div className="image-container position-absolute top-0 start-0 w-100 h-100">
                  <Image
                    src={`${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(exhibition.artwork.slug)}`}
                    alt={exhibition.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-300"
                    priority={index < 4}
                  />
                </div>
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 text-truncate">{exhibition.name}</Card.Title>
                <Card.Text className="text-muted small mb-0 text-truncate">
                  {formatDate(exhibition.fromDate)} - {formatDate(exhibition.toDate)}
                </Card.Text>
              </Card.Body>
            </Card>
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
          position: relative;
        }
      `}</style>
    </Container>
  );
};

export default ExhibitionsGrid;
