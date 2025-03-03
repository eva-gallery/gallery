import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Prize = () => {
  const [winners, setWinners] = useState([
    {
      place: '1st place',
      name: 'George Digalakis',
      slug: 'george-digalakis/george-digalakis/hopes-and-dreams',
      artistSlug: 'george-digalakis/george-digalakis',
      thumbnailUrl: null,
      countryCode: 'GR',
      artworkName: 'Hopes and Dreams',
      isLoading: true
    },
    {
      place: '2nd place',
      name: 'Andreas Varro',
      slug: 'andreas-varro/andreas-varro/homo-sapiens',
      artistSlug: 'andreas-varro/andreas-varro',
      thumbnailUrl: null,
      countryCode: 'SE',
      artworkName: 'Homo Sapiens',
      isLoading: true
    },
    {
      place: '3rd place',
      name: 'Natalia Philippou',
      slug: 'nataly-philippou/natalia-philippou/bend',
      artistSlug: 'nataly-philippou/natalia-philippou',
      countryCode: 'CY',
      artworkName: 'Bend',
      thumbnailUrl: null,
      isLoading: true
    }
  ]);

  useEffect(() => {
    const backendUrl = 'https://evagallery.b-cdn.net';
    
    // Create updated winners with thumbnail URLs
    const updatedWinners = winners.map(winner => {
      return {
        ...winner,
        thumbnailUrl: `${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(winner.slug)}`,
        isLoading: false
      };
    });
    
    setWinners(updatedWinners);
  }, []);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-4">INTRODUCING THE WINNERS OF THE 1ST EVA GALLERY PRIZE!</h1>
        <p className="lead mb-5">
          The first EVA Gallery Prize ceremony took place on the 28th of February, 2025,
          where the platform's top-scoring artists were celebrated in an international
          virtual event. The jury consisting of representatives from NGI Search and
          members of the EVA Gallery team took a vote, and selected the top 3 winning
          artists of the first-ever EVA Gallery Prize! Congratulations to all artists who
          participated, it was a very close call.
        </p>
        <h2 className="h3 mb-4">The winners are:</h2>
      </div>

      <Row className="justify-content-center g-4">
        {winners.map((winner, index) => (
          <Col key={index} lg={4} md={6} className="mb-5">
            <div className="text-center prize-card">
              <div className="artwork-container mb-4">
                {winner.isLoading ? (
                  <div className="placeholder-image" style={{ width: '100%', height: '400px', backgroundColor: '#f8f9fa' }}></div>
                ) : (
                  <a href={`/artists/${winner.artistSlug}`}>
                    <div className="image-wrapper position-relative overflow-hidden rounded shadow" style={{ paddingBottom: '133%', backgroundColor: '#f8f9fa' }}>
                      <Image
                        src={winner.thumbnailUrl}
                        alt={winner.artworkName}
                        className="position-absolute w-100 h-100 object-cover"
                        style={{ top: 0, left: 0, objectFit: 'cover' }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/placeholder.png';
                        }}
                      />
                    </div>
                  </a>
                )}
              </div>
              <div className="artist-info mb-2">
                <a href={`/artists/${winner.artistSlug}`} className="text-decoration-none">
                  <h3 className="h4 mb-2">{winner.name} <span className={`fi fi-${winner.countryCode.toLowerCase()} ms-2`}></span></h3>
                </a>
                <p className="text-muted">{winner.artworkName}</p>
              </div>
              <div className="position-relative mt-4">
                <h2 className="display-5 fw-bold text-primary">{winner.place}</h2>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <style jsx>{`
        .prize-card {
          transition: transform 0.3s ease;
        }
        
        .prize-card:hover {
          transform: translateY(-10px);
        }
        
        .image-wrapper {
          transition: box-shadow 0.3s ease;
        }
        
        .prize-card:hover .image-wrapper {
          box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
        }
        
        .object-cover {
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </Container>
  );
};

export default Prize;
