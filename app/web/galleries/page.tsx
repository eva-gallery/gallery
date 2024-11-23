import NavbarComponent from '../components/NavbarComponent';
import Galleries from '../components/Galleries';
import Footer from '../components/Footer';
import { Container, Row } from 'react-bootstrap';
import { getData } from "../get.data";

interface Artwork {
  slug: string;
  name: string;
  artistName: string;
  fromDate: string;
  toDate: string;
  countryCode: string;
  address: string;
}

export default async function GalleriesPage() {
  const seedno = Math.floor(Math.random() * (2 ** 32));
  const params = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "24"
  });
  
  const artworks = (await getData(`/public/random/gallery?${params}`)) as Artwork[];

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
  );
}