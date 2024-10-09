import { ExhibitionId, GalleryId } from '@modules/app-db/entities';

export interface GalleryExhibitionDto {
  id: ExhibitionId;
  name: string;
  fromDate: string;
  toDate: string;
  curator: string;
  gallery: {
    id: GalleryId;
    name: string;
  }
  public: boolean;
}