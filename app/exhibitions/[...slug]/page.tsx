// app/web/exhibitions/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { format, isValid } from 'date-fns';
import NavbarComponent from '@/app/web/components/NavbarComponent';
import Footer from '@/app/web/components/Footer';
import ArtworkGrid from '@/app/web/components/ArtworkGallery';
import ExhibitionUnityViewer from '@/app/web/components/ExhibitionUnityViewer';
import { getData } from "@/app/web/get.data";
import { Container, Row, Col } from 'react-bootstrap';

interface Exhibition {
  id: string;
  name: string;
  description: string;
  fromDate: string | null;
  toDate: string | null;
  curator: string | null;
  gallery: {
    id: string;
    name: string;
    slug: string;
    address: string;
    countryCode: string;
  };
  activeRoomId: string | null;
  artworks: Array<{
    id: string;
    name: string;
    slug: string;
    artistName: string;
    year: string | null;
    imageFilename?: string;
    thumbnailFilename?: string;
  }>;
}

interface PageProps {
  params: {
    slug: string[];
  };
}

// Format date helper function
function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'MMMM d, yyyy') : 'N/A';
}

export default async function ExhibitionDetail({ params }: PageProps) {
  const validSlug = params.slug.filter(Boolean).join('/');
  
  try {
    // Fetch exhibition data
    const exhibition = await getData<Exhibition>(`/public/exhibition?slug=${encodeURIComponent(validSlug)}`);
    
    if (!exhibition || !exhibition.name) {
      notFound();
    }

    return (
      <>
        <NavbarComponent />
        
        <Container className="py-5">
          {/* Exhibition Header */}
          <Row className="mb-5">
            <Col>
              <h1 className="display-5 mb-3">{exhibition.name}</h1>
              
              <div className="d-flex flex-wrap gap-4 mb-4">
                <div>
                  <strong>Gallery:</strong> {exhibition.gallery.name}
                  {exhibition.gallery.countryCode && (
                    <span className={`fi fi-${exhibition.gallery.countryCode.toLowerCase()} ms-2`}></span>
                  )}
                </div>
                
                {exhibition.curator && (
                  <div>
                    <strong>Curator:</strong> {exhibition.curator}
                  </div>
                )}
                
                <div>
                  <strong>Dates:</strong> {formatDate(exhibition.fromDate)} - {formatDate(exhibition.toDate)}
                </div>
              </div>
              
              {exhibition.description && (
                <div className="mb-5">
                  <div dangerouslySetInnerHTML={{ __html: exhibition.description }} />
                </div>
              )}
            </Col>
          </Row>
          
          {/* 3D Viewer (if activeRoomId exists) */}
          {exhibition.activeRoomId && (
            <Row className="mb-5">
              <Col>
                <h2 className="h3 mb-4">3D Exhibition Space</h2>
                <div style={{ width: '100%', height: '600px' }}>
                  <ExhibitionUnityViewer roomId={exhibition.activeRoomId} />
                </div>
              </Col>
            </Row>
          )}
          
          {/* Artworks Section */}
          <Row className="mb-4">
            <Col>
              <h2 className="h3 mb-4">Artworks in this Exhibition</h2>
            </Col>
          </Row>
          
          {exhibition.artworks && exhibition.artworks.length > 0 ? (
            <ArtworkGrid artworks={exhibition.artworks} seed={Math.floor(Math.random() * 1000000)} />
          ) : (
            <p className="text-center text-muted">No artworks found in this exhibition.</p>
          )}
        </Container>
        
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading exhibition:', error);
    notFound();
  }
}
