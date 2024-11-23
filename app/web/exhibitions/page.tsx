import NavbarComponent from '../components/NavbarComponent';
import ArtworkGallery from '../components/Exhibitions';
import Footer from '../components/Footer';
import { Container, Row } from 'react-bootstrap';
import { getData } from "../get.data";

interface Artwork {
  slug: string;
  name: string;
  artistName: string;
  fromDate: string | Date;
  toDate: string | Date;
}

export default async function ExhibitionsPage() {
  const seedno = Math.floor(Math.random() * (2 ** 32));
  const params = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "24"
  });
  
  const response = await getData(`/public/random/exhibition?${params}`);
  const artworks = (Array.isArray(response) ? response : []) as Artwork[];

  return (
    <>
      <NavbarComponent />
      <Container className="py-3">
        <Row>
          <ArtworkGallery artworks={artworks} />
        </Row>
      </Container>
      <Footer />
    </>
  );
}