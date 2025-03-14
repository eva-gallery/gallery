// app/web/artists/[...slug]/page.tsx
import NavbarComponent from '@/app/web/components/NavbarComponent';
import Footer from '@/app/web/components/Footer';
import ArtworkGrid from '@/app/web/components/ArtworkGallery';
import ExhibitionList from '@/app/web/components/ExhibitionList';
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
    thumbnailFilename?: string;
  };
  activeRoomId: string | null;
  slug: string;
}

interface ArtistDetailPageProps {
  params: {
    slug: string[]; // Next.js dynamic route params
  };
}

async function getArtistExhibitions(slug: string) {
  try {
    const exhibitions = await getData(`/public/artist/exhibition?slug=${encodeURIComponent(slug)}`) as Exhibition[];
    return Array.isArray(exhibitions) ? exhibitions : [];
  } catch (error) {
    console.error('Failed to fetch artist exhibitions:', error);
    return [];
  }
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
  const exhibitions = await getArtistExhibitions(validSlug);

  const artist = artistData as Artist;
  const artworks = Array.isArray(artworksData) ? artworksData as Artwork[] : [];

  // Determine prize text based on artist slug
  let prizeText = '';
  if (validSlug === 'george-digalakis/george-digalakis') {
    prizeText = 'E.V.A Gallery Prize 1st place winner';
  } else if (validSlug === 'andreas-varro/andreas-varro') {
    prizeText = 'E.V.A Gallery Prize 2nd place winner';
  } else if (validSlug === 'nataly-philippou/natalia-philippou') {
    prizeText = 'E.V.A Gallery Prize 3rd place winner';
  }

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
            <h1 className="mb-3">{artist.name} {artist.countryCode && (
              <span className={`fi fi-${artist.countryCode?.toLowerCase()} fs-6`}></span>
            )}</h1>
            {prizeText && <p className="text-uppercase"><strong>{prizeText}</strong></p>}
            {artist.biography && (
              <div className="mb-4" dangerouslySetInnerHTML={{ __html: artist.biography }}></div>
            )}
          </Col>
        </Row>

        {/* Artist's Exhibitions Section (if any) */}
        {exhibitions.length > 0 && (
          <Row className="mb-5">
            <Col>
              <h2 className="mb-4">Exhibitions by {artist.name}</h2>
              <ExhibitionList exhibitions={exhibitions} />
            </Col>
          </Row>
        )}

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
