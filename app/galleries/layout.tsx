// app/galleries/layout.tsx
import { Metadata } from 'next'
import NavbarComponent from '@/app/web/components/NavbarComponent'
import Footer from '@/app/web/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Recommended Galleries',
    template: '%s | EVA Gallery',
  },
  description: 'Browse our curated collection of art galleries.',
};

export default function GalleriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarComponent />
      <main>{children}</main>
      <Footer />
    </>
  );
}
