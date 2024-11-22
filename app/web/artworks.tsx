import { Container } from "react-bootstrap";
import NavbarComponent from './components/NavbarComponent';
import ArtworkGallery from './components/ArtworkGalleryHome';
import CarouselComponent from './components/CarouselComponent';
import Footer from './components/Footer';
import { getData } from "./get.data";

export default async function PublicHome() {

    const artworks=await getData("/public/random/artwork?seed=12345&from=0&count=20");

    return (
        <>

          <NavbarComponent />
          <ArtworkGallery artworks={artworks} />
          <CarouselComponent artworks={artworks} />
          <Footer />
          
        </>
      );
  }
  