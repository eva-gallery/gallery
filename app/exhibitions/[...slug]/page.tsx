// app/exhibitions/[...slug]/page.tsx
import ExhibitionDetail from "../../web/exhibitions/[...slug]/page";

interface PageProps {
  params: {
    slug: string[];
  }
}

export default function ExhibitionPage({ params }: PageProps) {
  return <ExhibitionDetail params={params} />;
}
