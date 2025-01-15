import React, { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface Artwork {
  nftData: {
    name: string;
    image: string;
  };
  artwork: {
    name: string;
  };
}

const ArtworkGrid = ({ artworks }: { artworks: Artwork[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="container mx-auto py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="flex items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">NFT minting and presentation</h2>
              <p className="mb-6">
                The platform integrates wallet connection mechanisms and NFT functionality, 
                allowing artists to incorporate blockchain technology into their collections. 
                An AI-based recommendation engine provides personalized experiences for visitors, 
                enhancing engagement with the artworks.
              </p>
              <a href="/admin/user/login">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Register now
                </button>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
            <Image
              src="/images/nft.jpg"
              alt="AI Art Protection"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full aspect-w-16 aspect-h-9 mt-8">
          <iframe 
            src="https://www.youtube.com/embed/lsyDyHHdPRM" 
            title="EVA Gallery YouTube video"
            className="w-full h-full rounded-lg"
            allowFullScreen
          />
        </div>
      </div>

      {/* NFT Grid Section */}
      <div className="container mx-auto px-4 mt-12 hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">NFTs</h1>
          <div className="relative">
            <input
              type="search"
              placeholder="Search NFTs..."
              className="pl-10 pr-4 py-2 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.slice(0, 24).map((artwork, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative pt-[100%]">
                <img
                  src={artwork.nftData.image}
                  alt={artwork.artwork.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">
                  {artwork.nftData.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {artwork.artwork.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkGrid;
