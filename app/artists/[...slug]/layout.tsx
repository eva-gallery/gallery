// app/artists/[...slug]/layout.tsx
import type { Metadata, ResolvingMetadata } from 'next';
import { getData } from "@/app/web/get.data";

// Utility functions can be moved to a separate file
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

function truncateText(text: string, maxLength: number = 200): string {
  if (!text || text.length <= maxLength) return text || '';

  const cleanText = stripHtmlTags(text);
  let truncated = cleanText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex !== -1 && lastSpaceIndex !== truncated.length - 1) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  return `${truncated.trim()}...`;
}

// Types
interface ArtistDetailProps {
  params: { slug: string[] };
}

interface Artist {
  name: string;
  biography: string;
  country: string;
  profileImage?: string;
}

// Metadata Generation
export async function generateMetadata(
  { params }: ArtistDetailProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Join slug array and clean
    const cleanSlug = params.slug.join('/');

    // Fetch artist details using the cleaned slug
    const artist = await getData(`/public/artist?slug=${cleanSlug}`) as Artist;

    return {
      title: `${artist.name} | Artist Profile`,
      description: truncateText(artist.biography, 200),
      openGraph: {
        title: `${artist.name} - Artist Profile`,
        description: truncateText(artist.biography, 200),
        images: artist.profileImage ? [{ url: artist.profileImage }] : [],
        type: 'profile'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${artist.name} | Artist Profile`,
        description: truncateText(artist.biography, 200),
        images: artist.profileImage ? [artist.profileImage] : []
      },
      alternates: {
        canonical: `/artists/${cleanSlug}`
      }
    };
  } catch (error) {
    return {
      title: 'Artist Profile',
      description: 'Artist details not found'
    };
  }
}

// Layout Component
export default function ArtistDetailLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}
