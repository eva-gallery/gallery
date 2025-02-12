'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Search } from 'lucide-react';
import { getData } from "@/app/web/get.data";

// Inline type definition
interface Artwork {
  slug: string;
  imageFilename?: string;
  thumbnailFilename?: string;
  name: string;
  artistName: string;
  artist: {
    name: string;
  };
  year?: number;
  medium?: string;
  imageUrl?: string;
}

const imgUrl = 'https://beta.evagallery.eu';

type ArtworkGalleryProps = {
  artworks: Artwork[];
  seed: number;
}

const ImageWithLazyLoading = ({ artwork }: { artwork: Artwork }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0,
        rootMargin: '200% 0px'
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const url = `${imgUrl}/protected/assets/thumbnail/${artwork.thumbnailFilename}`;
      const img = new Image();
      
      img.onload = () => {
        setAspectRatio((img.height / img.width) * 100);
        setImageUrl(url);
      };
      
      img.src = url;
    }
  }, [isVisible, artwork.slug]);

  return (
    <div ref={imageRef} className="image-container">
      <div 
        className="aspect-ratio-box" 
        style={{ 
          paddingBottom: `${aspectRatio || 75}%`,
          backgroundColor: '#f8f9fa',
          minHeight: '200px'
        }}
      >
        {!imageLoaded && (
          <div className="skeleton-image absolute-fill"></div>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={artwork.name}
            className={`absolute-fill ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
            onLoad={() => {
              setImageLoaded(true);
            }}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

const ArtworkGallery = ({ artworks: initialArtworks, seed }: ArtworkGalleryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const retryDelay = 2000;

  const observer = useRef<IntersectionObserver | null>(null);
  
  const loadMore = useCallback(async () => {
    try {
      if (loading || !hasMore) return;
      
      setLoading(true);
      setLoadError(null);

      const params = new URLSearchParams({
        seed: seed.toString(),
        from: (page * 24).toString(),
        count: "24"
      });

      const newArtworks = await getData(`/public/random/artwork?${params}`) as Artwork[];

      if (newArtworks.length < 24) {
        setHasMore(false);
      }

      setRetryCount(0);
      setArtworks(prev => [...prev, ...newArtworks]);
      setPage(prev => prev + 1);
      setLoading(false);

    } catch (error) {
      console.error('Error loading more artworks:', error);
      
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        setLoadError(`Loading failed. Retrying... (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
          setLoading(false);
          loadMore();
        }, retryDelay);
      } else {
        setLoadError('Failed to load more artworks. Please check your connection and try again.');
        setLoading(false);
      }
    }
  }, [loading, hasMore, page, seed, retryCount]);

  const lastArtworkRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore();
      }
    }, {
      threshold: 0.1,
      rootMargin: '200px'
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  const handleRetry = useCallback(() => {
    setRetryCount(0);
    setLoadError(null);
    loadMore();
  }, [loadMore]);

  const cleanFileName = (name: string) => {
    return name
      .replace(/\.(jpg|jpeg|png|gif|tif|tiff|kopie|bmp|webp)$/i, '')
      .replace(/[-_]/g, ' ')
      .trim();
  };

  // Filter artworks based on search term
  const filteredArtworks = artworks.filter(artwork => 
    artwork.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.artistName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="py-1">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Artworks Gallery</h1>
        </Col>
        <Col xs="auto">
          <div className="position-relative d-none">
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

      <div className="masonry-grid">
        {filteredArtworks.map((artwork, index) => (
          <Card 
            key={artwork.slug} 
            className="artwork-card border-0 shadow-sm"
            ref={index === filteredArtworks.length - 1 ? lastArtworkRef : null}
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
        
        {loading && (
          <>
            {[...Array(12)].map((_, i) => (
              <Card key={i} className="artwork-card border-0 shadow-sm skeleton">
                <div className="skeleton-image-container">
                  <div className="skeleton-image"></div>
                </div>
                <Card.Body>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </div>

      {loadError && (
        <div className="text-center mt-4">
          <p className="text-danger">{loadError}</p>
          {retryCount >= maxRetries && (
            <button 
              className="btn btn-primary mt-2"
              onClick={handleRetry}
            >
              Try Again
            </button>
          )}
        </div>
      )}

      <style jsx global>{`
        .masonry-grid {
          columns: 4;
          column-gap: 1.5rem;
          width: 100%;
          column-fill: balanced;
        }

        .artwork-card {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          display: inline-block;
          width: 100%;
          background: #fff;
          overflow: visible; /* Changed from hidden to visible */
          contain: content;
          will-change: transform; /* Add will-change to optimize performance */
          -webkit-transform: translateZ(0); /* Add transform layer for Safari */
          transform: translateZ(0);
        }

        .artwork-card:hover {
          transform: translateY(-5px) translateZ(0); /* Add translateZ for Safari */
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }

        /* Move overflow: hidden to the image container instead */
        .image-container {
          width: 100%;
          background-color: #f8f9fa;
          line-height: 0;
          position: relative;
          overflow: hidden;
          -webkit-transform: translateZ(0); /* Force GPU acceleration */
          transform: translateZ(0);
        }

        .aspect-ratio-box {
          position: relative;
          width: 100%;
          background-color: #f8f9fa;
          overflow: hidden;
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
          transition: opacity 0.3s ease;
        }

        .image-loaded {
          opacity: 1;
        }

        .skeleton {
          position: relative;
          overflow: hidden;
        }

        .skeleton-image-container {
          position: relative;
          width: 100%;
          padding-bottom: 75%;
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
