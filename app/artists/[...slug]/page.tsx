// app/artists/[...slug]/page.tsx
import ArtistDetail from "../../web/artists/[...slug]/page";

type Props = {
  params: {
    slug: string[]
  }
}

export default function ArtistPage({ params }: Props) {
  return (
    <>
      <ArtistDetail slug={params.slug} />
    </>
  );
}