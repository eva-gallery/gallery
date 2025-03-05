import { Container } from "react-bootstrap";
import NavbarComponent from './components/NavbarComponent';
import ArtworkGallery from './components/ArtworkGalleryHome';
import Galleries from './components/GalleriesHome';
import Exhibitions from './components/ExhibitionsHome';
import Nfts from './components/NftsHome';
import CarouselComponent from './components/CarouselComponent';
import Footer from './components/Footer';
import { getData } from "./get.data";

interface Artwork {
  slug: string;
  name: string;
  artistName: string;
  countryCode: string;
}

interface Gallery extends Artwork {
  address: string;
}

interface Exhibition extends Artwork {
  fromDate: string;
  toDate: string;
}

interface NFT extends Artwork {
  tokenId: string;
  blockchain: string;
}

export default async function PublicHome() {
  const seedno = Math.floor(Math.random() * (2 ** 32));
  
  const params1 = new URLSearchParams({ seed: seedno.toString(), from: "0", count: "64" });
  const params2 = new URLSearchParams({ seed: seedno.toString(), from: "16", count: "16" });
  const params3 = new URLSearchParams({ seed: seedno.toString(), from: "0", count: "16" });
  const params4 = new URLSearchParams({ seed: seedno.toString(), from: "0", count: "16" });

  const artworks = await getData(`/public/random/artwork?${params1}`) as Artwork[];
  // const artworks2 = await getData(`/public/random/artwork?${params2}`) as Artwork[];
  const galleries = await getData(`/public/random/gallery?${params3}`) as Gallery[];
  const exhibitions = await getData(`/public/random/exhibition?${params4}`) as Exhibition[];    
  // const nfts = await getData(`/public/random/nft?${params4}`) as NFT[];         

  return (
    <>
      <NavbarComponent />
      <ArtworkGallery artworks={artworks} />
      <Galleries artworks={galleries} />
      <Exhibitions artworks={exhibitions} />
      <Footer />
    </>
  );
}
