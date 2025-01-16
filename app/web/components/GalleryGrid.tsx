'use client'
import { Container, Form, Row, Col } from "react-bootstrap";
import { Search } from 'lucide-react';
// import type { Artist } from '@/app/web/types/artist';

const backendUrl = 'https://evagallery.b-cdn.net'; // https://cdn.evagallery.eu process.env.NEXT_PUBLIC_BACKEND_URL

interface Artwork {
  slug: string;
  // Add other artwork properties as needed
}

interface Artist {
  name: string;
  slug: string;
  countryCode?: string;
  artwork: Artwork;
  // Add other artist properties as needed
}

interface ArtistsGridProps {
  artists: Artist[];
}

const ArtistsGrid: React.FC<ArtistsGridProps> = ({ artists = [] }) => {
  // Ensure artists is always an array with the correct type
  const artistsList: Artist[] = Array.isArray(artists) ? artists : [];

  return (
    <Container className="py-3">
      {/* Header with search */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Featured Artists</h1>
        </Col>
        <Col xs="auto">
          <div className="position-relative">
            <Form.Control
              type="search"
              placeholder="Search artists..."
              className="ps-4"
              style={{ width: '300px' }}
            />
            <Search 
              size={18} 
              className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
            />
          </div>
        </Col>
      </Row>

      {/* Artists Grid */}
      <Row className="g-4">
        {artistsList.map((artist, index) => (
          <Col key={index} xs={12} sm={6} md={3}>
            <a 
              href={`/gallery/${artist.slug}`}
              className="text-decoration-none"
            >
              <div className="artist-card h-100 card border-0 shadow-sm">
                <div className="position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
                  <div className="position-absolute top-0 start-0 w-100 h-100">
                    <img
                      src={`${backendUrl}/public/gallery/thumbnail?slug=${encodeURIComponent(artist.artwork.slug)}`}
                      alt={artist.name}
                      className="w-100 h-100 object-cover"
                    />
                  </div>
                </div>
                <div className="card-body d-flex flex-row justify-content-between align-items-center">
                  <h5 className="card-title fs-6 mb-0 text-truncate text-dark">
                    {artist.name}
                  </h5>
                  
                  <span className={`fi fi-${artist.countryCode?.toLowerCase()} fs-6`}></span>
                  
                </div>
              </div>
            </a>
          </Col>
        ))}
      </Row>

      {/* Empty state */}
      {artistsList.length === 0 && (
        <div className="text-center py-5">
          <h3>No artists found</h3>
          <p className="text-muted">Please try a different search term.</p>
        </div>
      )}

      <style jsx>{`
        .artist-card {
          transition: all 0.3s ease;
        }

        .artist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }

        .artist-card img {
          transition: all 0.3s ease;
        }

        .artist-card:hover img {
          transform: scale(1.1);
        }

        .object-cover {
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </Container>
  );
};

export default ArtistsGrid;
