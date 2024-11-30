'use client'
import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Search } from 'lucide-react';
import { getImageData } from '@/app/web/imageLoader';

// Types
interface Artwork {
  slug: string;
  name: string;
}

interface Artist {
  name: string;
  slug: string;
  countryCode?: string;
  artwork: Artwork;
}

interface ArtistsGridProps {
  artists: Artist[];
}

const ArtistsGrid: React.FC<ArtistsGridProps> = ({ artists = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([]);

  // Filter artists based on search term
  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to shuffle array
  const shuffleArray = (array: number[]): number[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Load images for artists with minimal random delays
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setLoadedIndices([]);
      setImageUrls({});

      // Create array of indices and shuffle it
      const indices = shuffleArray([...Array(artists.length)].map((_, i) => i));
      
      // Load images one by one in random order with minimal delays
      for (const index of indices) {
        const artist = artists[index];
        
        // Minimal random delay between 25-75ms
        const delay = Math.random() * 50 + 25;
        await new Promise(resolve => setTimeout(resolve, delay));

        try {
          const imageUrl = await getImageData(
            `/public/artwork/thumbnail?slug=${encodeURIComponent(artist.artwork.slug)}`
          );

          setImageUrls(prev => ({
            ...prev,
            [artist.artwork.slug]: imageUrl
          }));

          setLoadedIndices(prev => [...prev, index]);
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }

      setLoading(false);
    };

    loadImages();

    // Cleanup function
    return () => {
      Object.values(imageUrls).forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [artists]);

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

      {/* Artists Grid */}
      <Row className="g-4">
        {filteredArtists.map((artist, index) => (
          <Col key={index} xs={12} sm={6} md={3}>
            <a 
              href={`/artists/${artist.slug}`}
              className="text-decoration-none"
            >
              <div className={`artist-card h-100 card border-0 shadow-sm ${
                loadedIndices.includes(index) ? 'loaded' : ''
              }`}>
                <div className="position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
                  <div className="position-absolute top-0 start-0 w-100 h-100">
                    <img
                      src={imageUrls[artist.artwork.slug] || '/images/placeholder.png'}
                      alt={artist.name}
                      className="w-100 h-100 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="card-body d-flex flex-row justify-content-between align-items-center">
                  <h5 className="card-title fs-6 mb-0 text-truncate text-dark">
                    {artist.name}
                  </h5>
                  {artist.countryCode && (
                    <span className={`fi fi-${artist.countryCode.toLowerCase()} fs-6`}></span>
                  )}
                </div>
              </div>
            </a>
          </Col>
        ))}
      </Row>

      {/* Empty state */}
      {!loading && filteredArtists.length === 0 && (
        <div className="text-center py-5">
          <h3>No artists found</h3>
          <p className="text-muted">Please try a different search term.</p>
        </div>
      )}

      <style jsx>{`
        .artist-card {
          transition: all 0.2s ease;
          opacity: 0;
          transform: translateY(10px);
        }

        .artist-card.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .artist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }

        .artist-card img {
          transition: all 0.2s ease;
          background-color: #f8f9fa;
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