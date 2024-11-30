'use server'

import axios, { AxiosError } from 'axios';

interface NFTFallback {
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

const generateFallbackNFTs = (count: number = 8): NFTFallback[] => 
    Array.from({ length: count }, (_, index) => ({
        slug: `placeholder-${index}`,
        name: `NFT #${index + 1}`,
        artistName: 'Artist Name',
        tokenId: index.toString(),
        blockchain: 'Ethereum',
        nftData: {
            name: `NFT #${index + 1}`,
            image: '/placeholder-nft.jpg'
        },
        artwork: {
            name: `NFT #${index + 1}`
        }
    }));

const FALLBACK_DATA = {
    nfts: generateFallbackNFTs(24),
    artworks: [],
    galleries: [],
    exhibitions: []
};

const isBackendAvailable = async (url: string): Promise<boolean> => {
    try {
        await fetch(url, { 
            method: 'HEAD',
            // Use cache: no-store instead of revalidate
            cache: 'no-store'
        });
        return true;
    } catch {
        return false;
    }
};

export async function getData<T>(endpoint: string): Promise<T> {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    
    // Check if backend is available
    const isAvailable = await isBackendAvailable(backendUrl);
    if (!isAvailable) {
        return getFallbackData<T>(endpoint);
    }

    try {
        const response = await axios<T>({
            method: "GET",
            url: `${backendUrl}${endpoint}`,
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 5000,
        });

        if (response.data) {
            return response.data;
        }
        
        return getFallbackData<T>(endpoint);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error('API Error:', {
                message: err.message || 'Network Error',
                status: err.response?.status || 'No Status',
                statusText: err.response?.statusText || 'No Status Text',
                url: `${backendUrl}${endpoint}`
            });
        } else {
            console.error('Unexpected error:', err);
        }

        return getFallbackData<T>(endpoint);
    }
}

function getFallbackData<T>(endpoint: string): T {
    // Remove console.log to reduce build output noise
    if (endpoint.includes('/random/nft')) {
        return FALLBACK_DATA.nfts as T;
    } else if (endpoint.includes('/random/artwork')) {
        return FALLBACK_DATA.artworks as T;
    } else if (endpoint.includes('/random/gallery')) {
        return FALLBACK_DATA.galleries as T;
    } else if (endpoint.includes('/random/exhibition')) {
        return FALLBACK_DATA.exhibitions as T;
    }
    
    return [] as T;
}