// types/artwork.ts
export interface Artwork {
    id: string;
    name: string;
    slug: string;
    artistName: string;
    artistSlug: string;
    year?: string;
    medium?: string;
    dimensions?: string;
    description?: string;
    tags?: string[];
    // Add other fields as needed
  }