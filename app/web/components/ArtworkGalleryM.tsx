'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Search, Loader } from 'lucide-react';

const backendUrl = 'https://evagallery.b-cdn.net'; // cdn.evagallery.eu / process.env.NEXT_PUBLIC_BACKEND_URL

type ArtworkGalleryProps = {
  artworks: any[];
  seed: number;
}

// Preload image to get dimensions
const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.src = url;
  });
};

// Loading Skeleton Component
const ArtworkSkeleton = () => (
  <Card className="artwork-card border-0 shadow-sm skeleton">
    <div className="skeleton-image-container">
      <div className="skeleton-image"></div>
    </div>
    <Card.Body>
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
    </Card.Body>
  </Card>
);

const ImageWithLazyLoading = ({ artwork }: { artwork: any }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const imageUrl = `${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(artwork.slug)}`;
      getImageDimensions(imageUrl).then(({ width, height }) => {
        setAspectRatio((height / width) * 100);
      });
    }
  }, [isVisible, artwork.slug]);

  return (
    <div ref={imageRef} className="image-container">
      <div 
        className="aspect-ratio-box" 
        style={{ paddingBottom: aspectRatio ? `${aspectRatio}%` : '75%' }}
      >
        {!imageLoaded && (
          <div className="skeleton-image absolute-fill"></div>
        )}
        {isVisible && (
          <img
            src={`${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(artwork.slug)}`}
            alt={artwork.name}
            className={`absolute-fill ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>
    </div>
  );
};

const ArtworkGallery = ({ artworks: initialArtworks, seed }: ArtworkGalleryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [artworks, setArtworks] = useState(initialArtworks);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Create a ref for the intersection observer
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Create a ref for the last artwork element
  const lastArtworkRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    }, {
      threshold: 0.1,
      rootMargin: '200px'
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const cleanFileName = (name: string) => {
    return name
      .replace(/\.(jpg|jpeg|png|gif|tif|tiff|kopie|bmp|webp)$/i, '') // Remove common image extensions
      .replace(/[-_]/g, ' ') // Optional: Replace dashes and underscores with spaces
      .trim(); // Remove any leading/trailing spaces
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const params = new URLSearchParams({
        seed: seed.toString(),
        from: (page * 24).toString(),
        count: "24"
      });

      const response = await fetch(`${backendUrl}/public/random/artwork?${params}`);
      if (!response.ok) throw new Error('Failed to fetch artworks');
      
      const newArtworks = await response.json();

      if (newArtworks.length < 24) {
        setHasMore(false);
      }

      // Add a slight delay to ensure smooth transition
      setTimeout(() => {
        setArtworks(prev => [...prev, ...newArtworks]);
        setPage(prev => prev + 1);
        setLoading(false);
      }, 300);

    } catch (error) {
      console.error('Error loading more artworks:', error);
      setLoadError('Failed to load more artworks. Scroll to try again.');
      setLoading(false);
    }
  };

  return (
    <Container className="py-1">
      {/* Header Row */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Artworks Gallery</h1>
        </Col>
        <Col xs="auto">
          <div className="position-relative">
            <Form.Control
              type="search"
              placeholder="Search artworks..."
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

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {artworks.map((artwork, index) => (
          <Card 
            key={index} 
            className="artwork-card border-0 shadow-sm"
            ref={index === artworks.length - 1 ? lastArtworkRef : null}
          >
            <a href={`/artworks/${artwork.slug}?seed=${seed}`} className="text-decoration-none">
              <ImageWithLazyLoading artwork={artwork} />
              <Card.Body>
                <Card.Title className="fs-6 text-truncate text-dark">
                  {cleanFileName(artwork.name)}
                  {artwork.year ? (
                    <small> ({artwork.year})</small>
                  ) : null}
                </Card.Title>
                <Card.Text className="text-muted small mb-0 text-truncate">
                  {artwork.artistName}
                </Card.Text>
              </Card.Body>
            </a>
          </Card>
        ))}
        
        {/* Loading Skeletons */}
        {loading && (
          <>
            <ArtworkSkeleton />
            <ArtworkSkeleton />
            <ArtworkSkeleton />
            <ArtworkSkeleton />
          </>
        )}
      </div>

      {loadError && (
        <div className="text-center mt-4 mb-4 text-danger">
          <p>{loadError}</p>
        </div>
      )}

      <style jsx global>{`
        .masonry-grid {
          columns: 4;
          column-gap: 1.5rem;
          width: 100%;
          column-fill: initial;
        }

        .artwork-card {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          display: inline-block;
          width: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #fff;
          overflow: hidden;
        }

        .artwork-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }

        .image-container {
          width: 100%;
          background-color: #f8f9fa;
          line-height: 0;
          position: relative;
        }

        .aspect-ratio-box {
          position: relative;
          width: 100%;
          background-color: #f8f9fa;
        }

        .absolute-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-loading {
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .image-loaded {
          opacity: 1;
          transition: opacity 0.5s ease;
        }

        /* Skeleton Styles */
        .skeleton {
          position: relative;
          overflow: hidden;
        }

        .skeleton-image-container {
          position: relative;
          width: 100%;
          padding-bottom: 75%; /* Default aspect ratio */
        }

        .skeleton-image {
          background: #f0f0f0;
          position: relative;
          overflow: hidden;
        }

        .skeleton-title {
          height: 20px;
          background: #f0f0f0;
          margin-bottom: 8px;
          border-radius: 4px;
        }

        .skeleton-text {
          height: 16px;
          background: #f0f0f0;
          width: 60%;
          border-radius: 4px;
        }

        .skeleton-image::after,
        .skeleton-title::after,
        .skeleton-text::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          animation: shimmer 2s infinite linear;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%);
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        @media (max-width: 1200px) {
          .masonry-grid {
            columns: 3;
          }
        }

        @media (max-width: 768px) {
          .masonry-grid {
            columns: 2;
          }
        }

        @media (max-width: 576px) {
          .masonry-grid {
            columns: 1;
          }
        }

        .artwork-card a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </Container>
  );
};

export default ArtworkGallery;