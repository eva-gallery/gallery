// app/web/artworks/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import NavbarComponent from '@/app/web/components/NavbarComponent'
import Footer from '@/app/web/components/Footer'
import ArtworkDetail from '@/app/web/components/ArtworkDetail'
import ArtworkGallery from '@/app/web/components/ArtworkGallery';
import { getData } from "@/app/web/get.data";

interface Artist {
  name: string;
  slug: string;
  biography?: string;
  countryCode?: string;
  born?: string | null;
}

interface Artwork {
  name: string;
  description?: string;
  artist: Artist;
  year?: number;
  measurements?: string;
  width?: number;
  height?: number;
  likes?: number;
  nft?: any;
  ai?: boolean;
  tags?: string[];
  slug?: string;  // Added slug to identify artwork
}

interface PageProps {
  params: {
    slug: string[]
  },
  searchParams: {
    seed?: string
  }
}

export default async function ArtworkDetailPage({ params, searchParams }: PageProps) {
  if (!params?.slug) {
    notFound();
  }

  try {
    const validSlug = params.slug.filter(Boolean).join('/');
    const data = await getData<Artwork>(`/public/artwork?slug=${encodeURIComponent(validSlug)}`);
    
    const artworkData: Artwork = {
      ...data,
      year: data.year ? Number(data.year) : undefined,
      tags: data.tags || undefined,
      slug: validSlug  // Store the slug
    };

    if (!artworkData.name || !artworkData.artist) {
      return (
        <>
          <NavbarComponent />
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold mb-4">Artwork Not Available</h2>
            <p>Sorry, we couldn&apos;t find the artwork you&apos;re looking for.</p>
          </div>
          <Footer />
        </>
      );
    }

    const seedno = searchParams?.seed ? 
      parseInt(searchParams.seed) : 
      Math.floor(Math.random() * (2 ** 32));
    
    const queryParams = new URLSearchParams({
      seed: seedno.toString(),
      from: "0",
      count: "33"  // Get extra items since we'll filter one out
    });
    
    const artworksData = await getData<Artwork[]>(`/public/random/artwork?${queryParams}`);
    
    // Filter out the current artwork and take 32 items
    const filteredArtworks = artworksData
      .filter(art => art.slug !== validSlug)
      .slice(0, 32);

    return (
      <>
        <NavbarComponent />
        <ArtworkDetail artwork={artworkData} imageSlug={validSlug} />
        {filteredArtworks.length > 0 && (
          <div className="py-5">
            <div className="container">
              <h2 className="h4 mb-4">More Artworks</h2>
              <ArtworkGallery artworks={filteredArtworks} seed={seedno} />
            </div>
          </div>
        )}
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading artwork:', error);
    return (
      <>
        <NavbarComponent />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold mb-4">Error Loading Artwork</h2>
          <p>Sorry, something went wrong. Please try again later.</p>
        </div>
        <Footer />
      </>
    );
  }
}