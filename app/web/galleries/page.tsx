// app/artists/page.tsx
import NavbarComponent from '../components/NavbarComponent';
import Galleries from '../components/Galleries';
import CarouselComponent from '../components/CarouselComponent';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'react-bootstrap'
import { getData } from "../get.data";

export default async function GalleriesPage() {
  // You can fetch your artists data here
  const seedno = Math.floor(Math.random() * (2 ** 32));
  const params = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "24"
});
const artworks = await getData(`/public/random/gallery?${params}`);

  return (
    <>
      <NavbarComponent />
      
      <Container className="py-3">
        
        <Row>
        <Galleries artworks={artworks} />
        </Row>
      </Container>

      <Footer />
    </>
  )
}