// app/artists/page.tsx
import NavbarComponent from '../components/NavbarComponent';
import ArtworkGallery from '../components/ArtworkGalleryM';
import CarouselComponent from '../components/CarouselComponent';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'react-bootstrap'
import { getData } from "../get.data";

export default async function ArtworksPage() {
  // You can fetch your artists data here
  const seedno = Math.floor(Math.random() * (2 ** 32));
  const params = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "25"
});

const artworks = await getData(`/public/random/artwork?${params}`);

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
  )
}