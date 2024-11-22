// app/web/artworks/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import NavbarComponent from '@/app/web/components/NavbarComponent'
import Footer from '@/app/web/components/Footer'
import ArtworkDetail from '@/app/web/components/ArtworkDetail'
import ArtworkGallery from '@/app/web/components/ArtworkGalleryHome';
import { getData } from "@/app/web/get.data";

type Props = {
  slug: string[],
  seed: string[]
}

export default async function ArtworkDetailPage({ slug, seed }: Props) {
  try {
    // Remove any undefined or empty values from the slug array
    const validSlug = slug.filter(Boolean).join('/');
    console.log('Fetching artwork with slug:', validSlug);
    
    const artwork = await getData(`/public/artwork?slug=${encodeURIComponent(validSlug)}`);

    const params = new URLSearchParams({
      seed: seed.toString(), // tu je
      from: "0",
      count: "33"
    });
    let artworks = await getData(`/public/random/artwork?${params}`);

    // Filter out the current artwork by slug
    artworks = artworks.filter(art => art.slug !== validSlug);
    
    // Take only the first 16 artworks after filtering
    artworks = artworks.slice(0, 32);
    
    if (!artwork || artwork.error) {
      notFound();
    }

    return (
      <>
        <NavbarComponent />
        <ArtworkDetail artwork={artwork} imageSlug={validSlug} />
        <ArtworkGallery artworks={artworks} />
        <Footer />
      </>
    );
  } catch (error: any) {
    console.error('Error details:', error);
    if (error?.status === 404 || error?.response?.status === 400) {
      notFound();
    }
    throw error;
  }
} 