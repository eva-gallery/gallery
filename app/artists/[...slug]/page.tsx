// app/artists/[...slug]/page.tsx
import ArtistDetail from "../../web/artists/[...slug]/page";

interface PageProps {
  params: {
    slug: string[];
  }
}

export default function ArtistPage({ params }: PageProps) {
  return (
    <>
      <ArtistDetail params={{ slug: params.slug }} />
    </>
  );
}