// app/artists/[slug]/layout.tsx
import type { Metadata, ResolvingMetadata } from 'next';
import { getData } from "@/app/web/get.data";

// Text Processing Utilities
export function stripHtmlTags(html: string): string {
  // Remove HTML tags
  return html.replace(/<[^>]*>/g, '');
}

export function truncateText(text: string, maxLength: number = 200): string {
  // If text is shorter than max length, return as is
  if (!text || text.length <= maxLength) return text || '';

  // Strip HTML tags first
  const cleanText = stripHtmlTags(text);

  // Truncate to maxLength
  let truncated = cleanText.substring(0, maxLength);

  // Find the last space to avoid cutting words mid-word
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  // If a space is found and it's not at the very end, use it to truncate
  if (lastSpaceIndex !== -1 && lastSpaceIndex !== truncated.length - 1) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  // Add ellipsis if text was truncated
  return `${truncated.trim()}...`;
}

// Types
interface ArtistDetailProps {
  params: { slug: string };
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
    // Decode and clean the slug
    const cleanSlug = decodeURIComponent(params.slug)
      .replace(/,/g, '/') // Replace comma with forward slash
      .replace(/\/+/g, '/'); // Ensure only single slashes

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
