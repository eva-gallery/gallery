'use client'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import Link from 'next/link'
import { User, Calendar, Brush, Ruler } from 'lucide-react'

const backendUrl = 'https://evagallery.b-cdn.net'; // https://cdn.evagallery.eu process.env.NEXT_PUBLIC_BACKEND_URL
const frontendUrl = 'https://beta.evagallery.eu';

interface Artist {
  name: string;
  slug: string;
}

interface Artwork {
  name: string;
  artist: Artist;
  year?: number;
  medium?: string;
  dimensions?: string;
  description?: string;
  measurements?: string;
  tags?: string[];
  imageFilename?: string;
  thumbnailFilename?: string;
}

interface ArtworkDetailProps {
  artwork: Artwork;
  imageSlug: string;
}

const cleanFileName = (name: string) => {
  return name
    .replace(/\.(jpg|jpeg|png|gif|tif|tiff|kopie|bmp|webp)$/i, '') // Remove common image extensions
    .replace(/[-_]/g, ' ') // Optional: Replace dashes and underscores with spaces
    .trim(); // Remove any leading/trailing spaces
};

const ArtworkDetail = ({ artwork, imageSlug }: ArtworkDetailProps) => {

  const imageUrl = artwork.thumbnailFilename
    ? `${frontendUrl}/protected/assets/thumbnail/${artwork.thumbnailFilename}`
    : `${backendUrl}/public/artwork/thumbnail?slug=${imageSlug.includes('"') 
        ? imageSlug.replace(/"/g, '%22') 
        : imageSlug}`;
  
  return (
    <Container className="py-5">
      <Row className="gx-5">
        {/* Image Section */}
        <Col lg={8} className="mb-4 mb-lg-0">
          <div className="position-relative bg-light rounded-3 overflow-hidden">
            <img
    src={imageUrl}
    alt={artwork.name}
    className="img-fluid w-100 h-auto"
  />
            <pre></pre>
          </div>
        </Col>

        {/* Details Section */}
        <Col lg={4}>
          <div className="sticky-lg-top" style={{ top: '100px' }}>
            <h1 className="h2 mb-3">{cleanFileName(artwork.name)}</h1>
            
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
