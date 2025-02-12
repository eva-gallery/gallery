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
    // Create IntersectionObserver with larger threshold for Safari
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px'  // Reduced rootMargin for better Safari support
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
        setImageLoaded(true);  // Set loaded state when image is ready
      };
      
      img.src = url;

      // Add error handling
      img.onerror = () => {
        console.error('Failed to load image:', url);
        // Optionally set a fallback image or show error state
      };
    }
  }, [isVisible, artwork.thumbnailFilename]);

  return (
    <div 
      ref={imageRef} 
      className="image-container"
      style={{ opacity: 1 }} // Force opacity in Safari
    >
      <div 
        className="aspect-ratio-box" 
        style={{ 
          paddingBottom: `${aspectRatio || 75}%`,
          backgroundColor: '#f8f9fa',
          minHeight: '200px',
          transform: 'translate3d(0,0,0)' // Force GPU rendering
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
            style={{
              transform: 'translate3d(0,0,0)', // Force GPU rendering
              opacity: imageLoaded ? 1 : 0
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

const distributeArtworks = (artworks: Artwork[]): Artwork[] => {
    // First remove exact duplicates by slug
    const uniqueBySlug = artworks.filter((artwork: Artwork, index: number, self: Artwork[]) =>
      index === self.findIndex((t: Artwork) => t.slug === artwork.slug)
    );
  
    // Group artworks by artist
    const byArtist = uniqueBySlug.reduce((acc: Record<string, Artwork[]>, artwork: Artwork) => {
      const artist = artwork.artistName;
      if (!acc[artist]) {
        acc[artist] = [];
      }
      acc[artist].push(artwork);
      return acc;
    }, {});
  
    let result: Artwork[] = [];
    const maxArtworksPerArtist = 2; // Adjust this number as needed
  
    // For each artist, limit their artworks
    Object.values(byArtist).forEach((artistWorks: Artwork[]) => {
      const limitedWorks = artistWorks.slice(0, maxArtworksPerArtist);
      result.push(...limitedWorks);
    });
  
    // Shuffle the results
    return result.sort(() => Math.random() - 0.5);
  };
  
  // Replace your current filteredArtworks with:
  const filteredArtworks = distributeArtworks(artworks).filter((artwork: Artwork) => 
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
            className="artwork-card border-0"
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
              <Card key={i} className="artwork-card border-0 skeleton">
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
  padding: 8px;
}

.artwork-card {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  display: inline-block;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  position: relative;
  overflow: visible;
  transition: all 0.2s ease-in-out;
}

/* Default shadow styles for non-Safari browsers */
@supports not (-webkit-hyphens:none) {
  .artwork-card {
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .artwork-card:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
}

/* Safari-specific shadow styles */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  _::-webkit-full-page-media, _:future, :root .artwork-card {
    -webkit-filter: drop-shadow(0 1px 3px rgba(0,0,0,0.1));
    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.1));
  }
  
  _::-webkit-full-page-media, _:future, :root .artwork-card:hover {
    -webkit-filter: drop-shadow(0 8px 24px rgba(0,0,0,0.15));
    filter: drop-shadow(0 8px 24px rgba(0,0,0,0.15));
  }
}

.artwork-card a {
  color: inherit;
  text-decoration: none;
  display: block;
}

.image-container {
  width: 100%;
  background-color: #f8f9fa;
  line-height: 0;
  position: relative;
  overflow: hidden; /* Important for containing the scaled image */
  border-radius: 4px 4px 0 0;
}

/* Modified image effects */
.image-container img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-out;
  will-change: transform;
}

.artwork-card:hover .image-container img {
  transform: scale(1.1);
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
  transition: transform 0.3s ease-out;
}

.artwork-card:hover .absolute-fill {
  transform: scale(1.1);
}

.card-body {
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 1;
  border-radius: 0 0 4px 4px;
}

/* Loading states */
.image-loading {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-loaded {
  opacity: 1;
}

.image-container img {
  transition: transform 0.3s ease-out;
}

.image-container:hover img {
  transform: scale(1.1) !important;
} 
      `}</style>
    </Container>
  );
};

export default ArtworkGallery;
