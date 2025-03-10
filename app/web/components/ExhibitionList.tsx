'use client'

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { format, isValid } from 'date-fns';

interface Exhibition {
  id: string;
  name: string;
  fromDate: string | null;
  toDate: string | null;
  curator: string;
  gallery: {
    name: string;
    slug: string;
  };
  artwork: {
    name: string;
    slug: string;
    thumbnailFilename?: string;
  };
  activeRoomId: string | null;
  slug: string;
}

interface ExhibitionListProps {
  exhibitions: Exhibition[];
}

const backendUrl = 'https://evagallery.b-cdn.net'; // CDN URL
const imgUrl = 'https://beta.evagallery.eu'; // Image base URL

const formatDate = (date: string | null) => {
  if (!date) return null;
  const parsedDate = new Date(date);
  return isValid(parsedDate) ? format(parsedDate, 'MMM d, yyyy') : null;
};

const ExhibitionList: React.FC<ExhibitionListProps> = ({ exhibitions }) => {
  return (
    <Row className="g-4">
      {exhibitions.map((exhibition) => (
        <Col key={exhibition.id} md={6} lg={4}>
          <a href={`/exhibitions/${exhibition.slug}`} className="text-decoration-none">
            <Card className="h-100 shadow-sm border-0 exhibition-card">
              <div className="image-wrapper position-relative overflow-hidden" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
                <div className="position-absolute top-0 start-0 w-100 h-100">
                  <Card.Img
                    variant="top"
                    src={exhibition.artwork.thumbnailFilename 
                      ? `${imgUrl}/protected/assets/thumbnail/${exhibition.artwork.thumbnailFilename}`
                      : `${backendUrl}/public/artwork/thumbnail?slug=${exhibition.artwork.slug}`}
                    alt={exhibition.name}
                    className="w-100 h-100 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/placeholder.png';
                    }}
                  />
                </div>
              </div>
              <Card.Body>
                <Card.Title className="fs-5 text-dark">{exhibition.name}</Card.Title>
                {(exhibition.fromDate || exhibition.toDate) && (
                  <Card.Text className="text-muted mb-2">
                    {exhibition.fromDate && formatDate(exhibition.fromDate)}
                    {exhibition.fromDate && exhibition.toDate && " - "}
                    {exhibition.toDate && formatDate(exhibition.toDate)}
                  </Card.Text>
                )}
                {exhibition.curator && (
                  <Card.Text className="mb-0">
                    <small className="text-muted">Curator: {exhibition.curator}</small>
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </a>
        </Col>
      ))}
      
      <style jsx global>{`
        .exhibition-card {
          transition: all 0.3s ease;
        }
        
        .exhibition-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }
        
        .image-wrapper {
          overflow: hidden;
          background-color: #f8f9fa;
        }
        
        .object-cover {
          object-fit: cover;
          object-position: center;
          transition: transform 0.3s ease;
        }
        
        .exhibition-card:hover .object-cover {
          transform: scale(1.1);
        }
      `}</style>
    </Row>
  );
};

export default ExhibitionList;
