// app/artworks/[...slug]/layout.tsx
import type { Metadata, ResolvingMetadata } from 'next';
import { getData } from "@/app/web/get.data";

// Utility functions
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

function constructImageUrl(thumbnailFilename: string): string {
  return `https://beta.evagallery.eu/protected/assets/thumbnail/${thumbnailFilename}`;
}

// Types
interface ArtworkDetailProps {
  params: { slug: string[] };
}

interface Artist {
  name: string;
  country?: string;
}

interface Artwork {
  name: string;
  artist: Artist;
  year?: number;
  medium?: string;
  dimensions?: string;
  description?: string;
  measurements?: string;
  tags?: string[];
  imageUrl?: string;
  thumbnailFilename?: string;
}

// Metadata Generation
export async function generateMetadata(
  { params }: ArtworkDetailProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Join slug array and clean
    const cleanSlug = params.slug.join('/');
    
    // Fetch artwork details using the cleaned slug
    const artwork = await getData(`/public/artwork?slug=${cleanSlug}`) as Artwork;
    
    // Construct image URL from thumbnailFilename
    const imageUrl = artwork.thumbnailFilename 
      ? constructImageUrl(artwork.thumbnailFilename)
      : undefined;

    // Construct metadata description
    const baseDescription = `${artwork.name} artwork by ${artwork.artist.name}`;
    const detailDescription = [
      baseDescription,
      artwork.year && `(${artwork.year})`,
      artwork.medium && `in ${artwork.medium}`,
      artwork.dimensions && `${artwork.dimensions}`
    ].filter(Boolean).join(' ');
    
    const fullDescription = artwork.description 
      ? `${baseDescription}. ${stripHtmlTags(artwork.description)}`
      : detailDescription;

    return {
      title: `${artwork.name} | Artwork by ${artwork.artist.name}`,
      description: fullDescription,
      openGraph: {
        title: `${artwork.name} - ${artwork.artist.name}`,
        description: fullDescription,
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: 'article'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${artwork.name} | Artwork`,
        description: fullDescription,
        images: imageUrl ? [imageUrl] : []
      },
      keywords: artwork.tags,
      alternates: {
        canonical: `/artworks/${cleanSlug}`
      }
    };
  } catch (error) {
    return {
      title: 'Artwork Details',
      description: 'Artwork details not found'
    };
  }
}

// Layout Component
export default function ArtworkDetailLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}
