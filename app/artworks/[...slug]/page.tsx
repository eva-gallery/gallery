// app/artworks/[...slug]/page.tsx
import ArtworkDetail from "../../web/artworks/[...slug]/page";
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string[]
  },
  searchParams: {
    seed: string[]
  }
}

export default function ArtworkPage({ params, searchParams }: Props) {
  // In case of invalid URL structure
  if (!params.slug || params.slug.length < 1) {
    notFound();
  }

  return (
    <>
      <ArtworkDetail 
        slug={params.slug} 
        seed={searchParams.seed || "12345"} // Provide a default value if seedno is not present
      />
    </>
  );
}