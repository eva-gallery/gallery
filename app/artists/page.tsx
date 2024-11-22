

// app/artists/page.tsx
import { getData } from "@/app/web/get.data";
import NavbarComponent from "@/app/web/components/NavbarComponent";
import Footer from "@/app/web/components/Footer";
import ArtistsGrid from "@/app/web/components/ArtistsGrid";
import { Metadata } from 'next';
import { Container } from 'react-bootstrap';

export const metadata: Metadata = {
  title: 'Featured Artists | E.V.A. Gallery',
  description: 'Discover talented artists from around the world showcasing their unique artworks in our gallery.',
  openGraph: {
    title: 'Featured Artists | E.V.A. Gallery',
    description: 'Discover talented artists from around the world showcasing their unique artworks in our gallery.',
    type: 'website',
    siteName: 'E.V.A. Gallery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Featured Artists | E.V.A. Gallery',
    description: 'Discover talented artists from around the world showcasing their unique artworks in our gallery.',
  },
};

export default async function ArtistsPage() {
  try {
    const seedno = Math.floor(Math.random() * (2 ** 32));
    const params = new URLSearchParams({
      seed: seedno.toString(),
      from: "0",
      count: "24"
    });
    const artists = await getData(`/public/random/artist?${params}`);

    // Ensure we have an array of artists
    const artistsData = Array.isArray(artists) ? artists : [];

    return (
      <>
        <NavbarComponent />
        <ArtistsGrid artists={artistsData} />
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error fetching artists:', error);

    return (
      <>
        <NavbarComponent />
        <Container className="py-5">
          <div className="text-center">
            <h1>Error Loading Artists</h1>
            <p className="text-muted">Please try again later.</p>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}