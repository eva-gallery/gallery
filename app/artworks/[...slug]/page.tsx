// app/artworks/[...slug]/page.tsx
import ArtworkDetailPage from "../../web/artworks/[...slug]/page";
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string[]
  },
  searchParams: {
    seed?: string
  }
}

export default function ArtworkPage(props: PageProps) {
  if (!props.params.slug || props.params.slug.length < 1) {
    notFound();
  }

  return <ArtworkDetailPage {...props} />;
}