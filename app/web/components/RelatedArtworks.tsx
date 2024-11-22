'use client'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Link from 'next/link'

const RelatedArtworks = ({ artworks, backendUrl }) => {
  return (
    <Container className="py-5">
      <h2 className="h3 mb-4">More from this artist</h2>
      <Row className="g-4">
        {artworks.map((artwork, index) => (
          <Col key={index} xs={12} sm={6} md={3}>
            <Link 
              href={`/artworks/${artwork.slug}`}
              className="text-decoration-none"
            >
              <Card className="artwork-card h-100 border-0 shadow-sm">
                <div className="position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
                  <div className="position-absolute top-0 start-0 w-100 h-100">
                    <Card.Img
                      variant="top"
                      src={`${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(artwork.slug)}`}
                      alt={artwork.name}
                      className="w-100 h-100 object-cover"
                    />
                  </div>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6 text-truncate text-dark">
                    {artwork.name}
                  </Card.Title>
                  <Card.Text className="text-muted small mb-0 text-truncate">
                    {artwork.artistName}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <style jsx>{`
        .artwork-card {
          transition: all 0.3s ease;
        }

        .artwork-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }

        .artwork-card img {
          transition: all 0.3s ease;
        }

        .artwork-card:hover img {
          transform: scale(1.1);
        }

        .object-cover {
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </Container>
  )
}

export default RelatedArtworks