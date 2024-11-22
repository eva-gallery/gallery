'use client'
import { Carousel, Container } from 'react-bootstrap'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const CarouselComponent = ({ artworks }) => {
  return (
    <Container className="py-5">
      <Carousel 
        className="bg-dark"
        interval={3000}
        indicators={true}
        controls={true}
      >
        {artworks.map((artwork, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '600px' }}>
              <img
                src={`${backendUrl}/public/artwork/thumbnail?slug=${artwork.slug}`} 
                alt={artwork.name}
                className="d-block"
                style={{ 
                  maxHeight: '100%',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded">
              <h3>{artwork.name}</h3>
              <p>{artwork.artistName}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}

export default CarouselComponent