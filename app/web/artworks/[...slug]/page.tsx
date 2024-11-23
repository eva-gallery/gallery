import { notFound } from 'next/navigation'
import NavbarComponent from '@/app/web/components/NavbarComponent'
import Footer from '@/app/web/components/Footer'
import ArtworkDetail from '@/app/web/components/ArtworkDetail'
import ArtworkGallery from '@/app/web/components/ArtworkGallery';
import { getData } from "@/app/web/get.data";

interface ApiArtwork {
  name: string;
  description?: string;
  artist: {
    name: string;
    slug: string;
    biography?: string;
    countryCode?: string;
    born?: string | null;
  };
  year?: string | number;
  measurements?: string;
  width?: number;
  height?: number;
  likes?: number;
  nft?: any;
  ai?: boolean;
  tags?: string[] | null;
}

interface ArtworkComponentProps {
  artwork: {
    name: string;
    description?: string;
    artist: {
      name: string;
      slug: string;
      biography?: string;
      countryCode?: string;
      born?: string | null;
    };
    year?: number;
    measurements?: string;
    width?: number;
    height?: number;
    likes?: number;
    nft?: any;
    ai?: boolean;
    tags?: string[];  // Removed null from type
  };
  imageSlug: string;
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
    const data = await getData(`/public/artwork?slug=${encodeURIComponent(validSlug)}`) as ApiArtwork;
    
    const artworkData: ArtworkComponentProps['artwork'] = {
      ...data,
      year: data.year ? Number(data.year) : undefined,
      tags: data.tags || undefined  // Convert null to undefined
    };

    if (!artworkData || typeof artworkData !== 'object' || !('name' in artworkData) || !('artist' in artworkData)) {
      notFound();
    }

    const seedno = searchParams?.seed ? 
      parseInt(searchParams.seed) : 
      Math.floor(Math.random() * (2 ** 32));
    
    const queryParams = new URLSearchParams({
      seed: seedno.toString(),
      from: "0",
      count: "33"
    });
    
    const artworksData = await getData(`/public/random/artwork?${queryParams}`);
    const artworks = (Array.isArray(artworksData) ? artworksData : []).slice(0, 32);

    return (
      <>
        <NavbarComponent />
        <ArtworkDetail artwork={artworkData} imageSlug={validSlug} />
        <ArtworkGallery artworks={artworks} seed={seedno} />
        <Footer />
      </>
    );
  } catch (error: any) {
    console.error('Error details:', error);
    notFound();
  }
}