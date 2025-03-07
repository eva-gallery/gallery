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
  };
  activeRoomId: string | null;
  slug: string;
}

interface ExhibitionListProps {
  exhibitions: Exhibition[];
}

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
      `}</style>
    </Row>
  );
};

export default ExhibitionList;
