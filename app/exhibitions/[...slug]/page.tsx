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

// app/exhibitions/[...slug]/not-found.tsx
import Link from 'next/link'
import NavbarComponent from '@/app/web/components/NavbarComponent'
import Footer from '@/app/web/components/Footer'
import { Container } from 'react-bootstrap'
 
export default function NotFound() {
  return (
    <>
      <NavbarComponent />
      <Container className="py-5 text-center">
        <h2>Exhibition Not Found</h2>
        <p>Could not find the requested exhibition.</p>
        <Link href="/exhibitions" className="btn btn-primary mt-3">
          Back to Exhibitions
        </Link>
      </Container>
      <Footer />
    </>
  )
}

// app/exhibitions/page.tsx
// This would be the exhibitions main listing page that already exists
