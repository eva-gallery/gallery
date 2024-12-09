// types/artist.ts
export interface Artwork {
    slug: string;
    name: string;
    // Add other artwork properties as needed
  }
  
  export interface Artist {
    id?: string;
    name: string;
    slug: string;
    biography?: string;
    countryCode?: string;
    artwork: Artwork;
    // Add other artist properties as needed
  }