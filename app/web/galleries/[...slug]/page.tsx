// app/web/galleries/[...slug]/page.tsx

import { Container, Row, Col } from 'react-bootstrap'
import ArtworkGrid from '@/app/web/components/ArtworkGallery'
import GalleryImage from '@/app/web/components/GalleryImage'
import { getData } from "@/app/web/get.data";

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

async function getGalleryData(slug: string) {
  try {
    return await getData(`/public/gallery?slug=${encodeURIComponent(slug)}`) as Gallery;
  } catch (error) {
    console.error('Failed to fetch gallery data:', error);
    throw error;
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
  const artworksData = await getData(`/public/random/artwork?${urlParams}`);
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

        <Row className="mb-4">
          <Col>
            <h2 className="mb-4">Artworks at {gallery.name}</h2>
            <ArtworkGrid 
              artworks={artworks}
              seed={seedno}
            />
          </Col>
        </Row>
      </Container>
  );
}
