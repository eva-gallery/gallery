// app/artists/page.tsx
import { getData } from "@/app/web/get.data";
import NavbarComponent from "@/app/web/components/NavbarComponent";
import Footer from "@/app/web/components/Footer";
import ArtistsGrid from "@/app/web/components/ArtistsGrid";
import { Container } from 'react-bootstrap';
import { Metadata } from 'next';

// Define interfaces that match the data structure
interface Artwork {
  slug: string;
  name: string;
  // Add other artwork properties as needed
}

interface Artist {
  id?: string;
  name: string;
  slug: string;
  biography?: string;
  countryCode?: string;
  artwork: Artwork;  // Make sure this matches the required property
  // Add other artist properties as needed
}

export const metadata: Metadata = {
  title: 'Featured Artists | E.V.A. Gallery',
  description: 'Discover talented artists from around the world showcasing their unique artworks in our gallery.',
  openGraph: {
    title: 'Featured Artists | E.V.A. Gallery',
    description: 'Discover talented artists from around the world showcasing their unique artworks in our gallery.',
    type: 'website',
    siteName: 'E.V.A. Gallery',
    url: '/artists',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Featured Artists | E.V.A. Gallery',
    description: 'Discover talented artists from around the world showcasing their unique artworks in our gallery.',
  },
  alternates: {
    canonical: '/artists',
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
    
    // Type assertion with validation
    const artistsData: Artist[] = Array.isArray(artists) 
      ? artists.filter((artist): artist is Artist => {
          return (
            artist &&
            typeof artist.name === 'string' &&
            typeof artist.slug === 'string' &&
            artist.artwork &&
            typeof artist.artwork.slug === 'string'
          );
        })
      : [];

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
            <p className="text-muted">
              {error instanceof Error ? error.message : 'Please try again later.'}
            </p>
            <a href="/" className="btn btn-primary mt-3">
              Return to Home
            </a>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}