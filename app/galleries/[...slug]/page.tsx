// app/galleries/[...slug]/page.tsx
import GalleryDetail from "../../web/galleries/[...slug]/page";

interface PageProps {
  params: {
    slug: string[];
  }
}

export default function GalleryPage({ params }: PageProps) {
  return <GalleryDetail params={params} />;
}
