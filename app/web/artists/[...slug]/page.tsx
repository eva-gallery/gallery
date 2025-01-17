// Corrected TypeScript file: app/web/artists/[...slug]/page.tsx
import NavbarComponent from '@/app/web/components/NavbarComponent';
import Footer from '@/app/web/components/Footer';
import ArtworkGrid from '@/app/web/components/ArtworkGallery';
import { Container, Row, Col } from 'react-bootstrap';
import { getData } from "@/app/web/get.data";

interface Artist {
  name: string;
  countryCode?: string;
  biography?: string;
}

interface Artwork {
  id?: string;
  name: string;
  slug: string;
  // Add other artwork properties as needed
}

interface ArtistDetailPageProps {
  params: {
    slug: string[]; // Next.js dynamic route params
  };
}

export default async function ArtistDetail({ params }: ArtistDetailPageProps) {
  const { slug } = params;
  const validSlug = slug.filter(Boolean).join('/');

  const seedno = Math.floor(Math.random() * (2 ** 32));
  const paramsQuery = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "96",
    artist: validSlug
  });

  // Fetch artist data and their artworks
  const artistData = await getData(`/public/artist?slug=${encodeURIComponent(validSlug)}`);
  const artworksData = await getData(`/public/random/artwork?${paramsQuery}`);

  const artist = artistData as Artist;
  const artworks = Array.isArray(artworksData) ? artworksData as Artwork[] : [];

  return (
    <>
      <NavbarComponent />

      <Container className="py-3">
        {/* Artist Info Section */}
        <Row className="mb-5">
          <Col md={4} className='d-none'>
            {/* Artist Image */}
          </Col>
          <Col md={12}> 
            <h1 className="mb-4">{artist.name} <span className={`fi fi-${artist.countryCode?.toLowerCase()} fs-6`}></span></h1>
            {artist.biography && (
              <div className="mb-4" dangerouslySetInnerHTML={{ __html: artist.biography }}></div>
            )}
          </Col>
        </Row>

        {/* Artist's Artworks Section */}
        <Row className="mb-4">
          <Col>
            <h2 className="mb-4">Artworks by {artist.name}</h2>
            <ArtworkGrid 
              artworks={artworks} 
              seed={seedno}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
