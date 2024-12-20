// app/exhibitions/page.tsx
import NavbarComponent from '../components/NavbarComponent';
import ExhibitionsGrid from '../components/Exhibitions';
import Footer from '../components/Footer';
import { Container, Row } from 'react-bootstrap';
import { getData } from "../get.data";

interface Exhibition {
  name: string;
  fromDate: string | Date;
  toDate: string | Date;
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

export default async function ExhibitionsPage() {
  const seedno = Math.floor(Math.random() * (2 ** 32));
  const params = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "24"
  });
  
  const response = await getData(`/public/random/exhibition?${params}`);
  const exhibitions = (Array.isArray(response) ? response : []) as Exhibition[];

  return (
    <>
      <NavbarComponent />
      <Container className="py-3">
        <Row>
          <ExhibitionsGrid exhibitions={exhibitions} />
        </Row>
      </Container>
      <Footer />
    </>
  );
}
