import NavbarComponent from '../components/NavbarComponent';
import ArtworkGallery from '../components/Nfts';
import Footer from '../components/Footer';
import { Container, Row } from 'react-bootstrap';
import { getData } from "../get.data";

interface Artwork {
  slug: string;
  name: string;
  artistName: string;
  tokenId: string;
  blockchain: string;
  nftData: {
    name: string;
    image: string;
  };
  artwork: {
    name: string;  // Changed from title to name
  };
}

export default async function NftsPage() {
  const seedno = Math.floor(Math.random() * (2 ** 32));
  const params = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "24"
  });
  
  const artworks = (await getData(`/public/random/nft?${params}`)) as Artwork[];

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