// app/galleries/[...slug]/layout.tsx
import { Metadata } from 'next'
import { getData } from "@/app/web/get.data";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    slug: string[];
  };
}

interface Gallery {
  name: string;
  countryCode?: string;
  description?: string;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const validSlug = params.slug.filter(Boolean).join('/');
  const galleryData = await getData(`/public/gallery?slug=${encodeURIComponent(validSlug)}`) as Gallery;
  
  const plainDescription = galleryData.description?.replace(/<[^>]+>/g, '') || '';
  const truncatedDescription = plainDescription.length > 200 
    ? plainDescription.substring(0, 197) + '...'
    : plainDescription;

  const backendUrl = 'https://evagallery.b-cdn.net'; // process.env.NEXT_PUBLIC_BACKEND_URL ||
  const galleryImageUrl = `${backendUrl}/public/gallery/image?slug=${encodeURIComponent(validSlug)}`;
  
  return {
    title: galleryData.name,
    description: truncatedDescription,
    openGraph: {
      title: galleryData.name,
      description: truncatedDescription,
      type: 'article',
      images: [
        {
          url: galleryImageUrl,
          width: 1200,
          height: 630,
          alt: galleryData.name,
        }
      ],
      siteName: 'EVA Gallery',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: galleryData.name,
      description: truncatedDescription,
      images: [galleryImageUrl],
    },
    alternates: {
      canonical: `/galleries/${validSlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: 'EVA Gallery' }],
    creator: 'EVA Gallery',
    publisher: 'EVA Gallery',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}
