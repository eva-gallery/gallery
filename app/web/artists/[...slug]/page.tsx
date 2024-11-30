// app/web/artists/[...slug]/page.tsx
import NavbarComponent from '@/app/web/components/NavbarComponent'
import Footer from '@/app/web/components/Footer'
import ArtworkGrid from '@/app/web/components/ArtworkGallery'
import { Container, Row, Col } from 'react-bootstrap'
import { getData } from "@/app/web/get.data";

type Props = {
  slug: string[]  // Changed to array since it's [...slug]
}

interface ArtistDetailProps {
  slug: string[];
}

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

export default async function ArtistDetail({ slug }: ArtistDetailProps) {
  // Join the slug array parts
  const validSlug = slug.filter(Boolean).join('/');

  const seedno = Math.floor(Math.random() * (2 ** 32));
  const params = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "24",
    artist: validSlug
  });

  // Fetch artist data and their artworks
  const artistData = await getData(`/public/artist?slug=${encodeURIComponent(validSlug)}`);
  const artworksData = await getData(`/public/random/artwork?${params}`);

  // Type assertions with validation
  const artist = artistData as Artist;
  const artworks = Array.isArray(artworksData) ? artworksData as Artwork[] : [];

  return (
    <>
      <NavbarComponent />
      
      <Container className="py-5">
        {/* Artist Info Section */}
        <Row className="mb-5">
          <Col md={4} className='d-none'>
            {/* Artist Image 
            <div className="position-relative rounded overflow-hidden" style={{ paddingTop: '100%' }}>
              <img
                src={`/api/placeholder/400/400`} // Replace with actual artist image
                alt={artist.name}
                className="position-absolute top-0 start-0 w-100 h-100 object-cover"
              />
            </div> */}
          </Col>
          <Col md={12}> 
            <h1 className="mb-4">{artist.name} <small>({artist.countryCode})</small></h1>
            
            {artist.biography && (
              <div className="mb-4" dangerouslySetInnerHTML={{ __html: artist.biography }}>
              </div>
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
  )
}