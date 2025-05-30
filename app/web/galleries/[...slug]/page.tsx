// app/web/galleries/[...slug]/page.tsx

import { Container, Row, Col, Card } from 'react-bootstrap'
import ArtworkGrid from '@/app/web/components/GalleriesMore'
import GalleryImage from '@/app/web/components/GalleryImage'
import ExhibitionList from '@/app/web/components/ExhibitionList'
import { getData } from "@/app/web/get.data";
import { format, isValid } from 'date-fns';

interface PageProps {
  params: {
    slug: string[];
  };
}

interface Gallery {
  name: string;
  countryCode?: string;
  description?: string;
}

interface Exhibition {
  id: string;
  name: string;
  fromDate: string | null;
  toDate: string | null;
  curator: string;
  gallery: {
    name: string;
    slug: string;
  };
  artwork: {
    name: string;
    slug: string;
  };
  activeRoomId: string | null;
  slug: string;
}

async function getGalleryData(slug: string) {
  try {
    return await getData(`/public/gallery?slug=${encodeURIComponent(slug)}`) as Gallery;
  } catch (error) {
    console.error('Failed to fetch gallery data:', error);
    throw error;
  }
}

async function getGalleryExhibitions(slug: string) {
  try {
    const exhibitions = await getData(`/public/gallery/exhibition?slug=${encodeURIComponent(slug)}`) as Exhibition[];
    return Array.isArray(exhibitions) ? exhibitions : [];
  } catch (error) {
    console.error('Failed to fetch gallery exhibitions:', error);
    return [];
  }
}

export default async function GalleryDetail({ params }: PageProps) {
  const validSlug = params.slug.filter(Boolean).join('/');

  const seedno = Math.floor(Math.random() * (2 ** 32));
  const urlParams = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "24",
    gallery: validSlug
  });

  const gallery = await getGalleryData(validSlug);
  const exhibitions = await getGalleryExhibitions(validSlug);
  const artworksData = await getData(`/public/random/gallery?${urlParams}`);
  const artworks = Array.isArray(artworksData) ? artworksData : [];

  return (
      <Container className="py-3">
        <Row className="mb-4">
          <Col>
            <h1 className="mb-0">
              {gallery.name}
              {gallery.countryCode && (
                <span className={`fi fi-${gallery.countryCode.toLowerCase()} ms-2 fs-6`}></span>
              )}
            </h1>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={4} className="mb-4 mb-md-0">
            <GalleryImage slug={validSlug} />
          </Col>
          <Col md={8}>
            {gallery.description && (
              <div className="gallery-description" dangerouslySetInnerHTML={{ __html: gallery.description }}>
              </div>
            )}
          </Col>
        </Row>
        
        {exhibitions.length > 0 && (
          <Row className="mb-5">
            <Col>
              <h2 className="mb-4">Exhibitions</h2>
              <ExhibitionList exhibitions={exhibitions} />
            </Col>
          </Row>
        )}

        <Row className="mb-4">
          <Col>
            <h2 className="mb-4">Other galleries</h2>
            <ArtworkGrid 
              artworks={artworks}
              seed={seedno}
            />
          </Col>
        </Row>
      </Container>
  );
}
