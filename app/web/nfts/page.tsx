// ./app/web/nfts/page.tsx

import NavbarComponent from '../components/NavbarComponent';
import ArtworkGallery from '../components/Nfts';
import Footer from '../components/Footer';
import { Container, Row } from 'react-bootstrap';
import { getData } from "../get.data";

interface Artwork {
    slug: string;
    name: string;
    artistName: string;
    tokenId: string;
    blockchain: string;
    nftData: {
        name: string;
        image: string;
    };
    artwork: {
        name: string;
    };
}

export default async function NftsPage() {
    let artworks: Artwork[] = [];

    try {
        const seedno = Math.floor(Math.random() * (2 ** 32));
        const params = new URLSearchParams({
            seed: seedno.toString(),
            from: "0",
            count: "24"
        });
        
        artworks = await getData<Artwork[]>(`/public/random/nft?${params}`);
    } catch (error) {
        console.error('Error loading NFTs:', error);
        // Use empty array if error occurs - fallback data is handled in getData
    }

    return (
        <>
            <NavbarComponent />
            <Container className="py-3">
                <Row>
                    {artworks && artworks.length > 0 ? (
                        <ArtworkGallery artworks={artworks} />
                    ) : (
                        <div className="w-full text-center py-8">
                            <h2 className="text-xl font-semibold mb-4">Loading NFTs...</h2>
                            <p className="text-gray-600">Please wait while we fetch the collection.</p>
                        </div>
                    )}
                </Row>
            </Container>
            <Footer />
        </>
    );
}