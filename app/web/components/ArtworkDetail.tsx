'use client'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import Link from 'next/link'
import { User, Calendar, Brush, Ruler } from 'lucide-react'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const ArtworkDetail = ({ artwork, imageSlug }) => {
  return (
    <Container className="py-5">
      <Row className="gx-5">
        {/* Image Section */}
        <Col lg={8} className="mb-4 mb-lg-0">
          <div className="position-relative bg-light rounded-3 overflow-hidden">
            <img
              src={`${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(imageSlug)}`}
              alt={artwork.name}
              className="img-fluid w-100 h-auto"
            />
            <pre></pre>
          </div>
        </Col>

        {/* Details Section */}
        <Col lg={4}>
          <div className="sticky-lg-top" style={{ top: '100px' }}>
            <h1 className="h2 mb-3">{artwork.name}</h1>
            
            <Link 
              href={`/artists/${artwork.artist.slug}`} 
              className="text-decoration-none d-flex align-items-center mb-4"
            >
              <User size={20} className="me-2 text-muted" />
              <span className="h5 mb-0 text-primary hover:text-primary-dark">
                {artwork.artist.name}
              </span>
            </Link>

            {/* Details List */}
            <ul className="list-unstyled mb-4">
              {artwork.year && (
                <li className="d-flex align-items-center mb-3">
                  <Calendar size={20} className="me-2 text-muted" />
                  <span className="">{artwork.year}</span><span className="text-muted"></span>
                </li>
              )}

              {artwork.medium && (
                <li className="d-flex align-items-center mb-3">
                  <Brush size={20} className="me-2 text-muted" />
                  <span className="text-muted">Medium: </span>
                  <span className="ms-2">{artwork.medium}</span>
                </li>
              )}

              {artwork.dimensions && (
                <li className="d-flex align-items-center mb-3">
                  <Ruler size={20} className="me-2 text-muted" />
                  <span className="text-muted">Dimensions: </span>
                  <span className="ms-2">{artwork.dimensions}</span>
                </li>
              )}
            </ul>

            {artwork.description && (
              <div className="mb-4">
                <h2 className="h6 mb-3 d-flex align-items-center">
                  About this artwork
                </h2>
                <p className="text-muted">{artwork.description}</p>
                <p className="text-muted">{artwork.measurements}</p>
              </div>
            )}

            {artwork.tags && artwork.tags.length > 0 && (
              <div className="mb-4">
                <h2 className="h6 mb-3">Tags</h2>
                <div className="d-flex flex-wrap gap-2">
                  {artwork.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      bg="light" 
                      text="dark" 
                      className="py-2 px-3 text-decoration-none"
                      as={Link}
                      href={`/artworks?tag=${encodeURIComponent(tag)}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Add hover effect styles */}
            <style jsx global>{`
              .artwork-image-container {
                transition: transform 0.3s ease;
              }

              .artwork-image-container:hover {
                transform: scale(1.02);
              }

              .badge:hover {
                background-color: var(--bs-gray-200) !important;
              }

               .text-primary {
                color: #0d3c81 !important;
               } 
            `}</style>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ArtworkDetail