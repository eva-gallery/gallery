// app/artists/page.tsx
import NavbarComponent from '../components/NavbarComponent';
import ArtworkGallery from '../components/ArtworkGalleryM';
import CarouselComponent from '../components/CarouselComponent';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'react-bootstrap'
import { getData } from "../get.data";

interface Artwork {
  id?: string;
  name: string;
  slug: string;
  // Add other artwork properties as needed
}

export default async function ArtworksPage() {
  try {
    const seedno = Math.floor(Math.random() * (2 ** 32));
    const params = new URLSearchParams({
      seed: seedno.toString(),
      from: "0",
      count: "25"
    });

    const artworksData = await getData(`/public/random/artwork?${params}`);
    const artworks: Artwork[] = Array.isArray(artworksData) ? artworksData : [];

    return (
      <>
        <NavbarComponent />
        
        <Container className="py-3">
          <Row>
            <ArtworkGallery artworks={artworks} seed={seedno} />
          </Row>
        </Container>

        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return (
      <>
        <NavbarComponent />
        <Container className="py-5">
          <div className="text-center">
            <h1>Error Loading Artworks</h1>
            <p className="text-muted">Please try again later.</p>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}