// app/galleries/page.tsx
import { Container, Row } from 'react-bootstrap';
import Galleries from '@/app/web/components/Galleries';
import { getData } from "@/app/web/get.data";

interface Artwork {
  slug: string;
  name: string;
  artistName: string;
  fromDate: string;
  toDate: string;
  countryCode: string;
  address: string;
}

// Server Component for data fetching
async function fetchGalleriesData() {
  const seedno = Math.floor(Math.random() * (2 ** 32));
  const params = new URLSearchParams({
    seed: seedno.toString(),
    from: "0",
    count: "96"
  });
  
  const artworks = await getData(`/public/random/gallery?${params}`) as Artwork[];
  return artworks;
}

export default async function GalleriesPage() {
  const artworks = await fetchGalleriesData();

  return (
    <Container className="py-3">
      <Row>
        <Galleries artworks={artworks} />
      </Row>
    </Container>
  );
}
