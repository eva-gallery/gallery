import { Injectable, Logger } from '@nestjs/common';
import '@polkadot/api-augment';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { create } from 'ipfs-http-client';
import { AdminRepository, NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class NftCreator {
  private readonly logger = new Logger(NftCreator.name)
  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository, private adminRepository: AdminRepository) {

  }

  async createNFTCall(artworkId: string, address: string, userId: string): Promise<string> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they didnt return null and do nothing

    const artwork = await this.nftRepository.getArtwork(artworkId);
    const user = await this.nftRepository.getUser(userId);
    if (!user || !artwork) {
      return null
    }

    let cid = null
    let metadataCid = null


    try {
      const IPFS_NODE_URL = this.configService.get("IPFS_URL");
      const username = this.configService.get("IPFS_NAME");
      const password = this.configService.get("IPFS_PASSWORD");

      //Create metadata
      const metadata = JSON.stringify({
        description: artwork.description,
        artist: artwork.artist,
        year: artwork.year,
        artworkGenre: artwork.artworkGenre,
        artworkMaterial: artwork.artworkMaterial,
        artworkTechnique: artwork.artworkTechnique,
        artworkWorktype: artwork.artworkWorktype,
        measurements: artwork.measurements,
      });

      const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
      const client = create({
        url: IPFS_NODE_URL,
        headers: {
          authorization: auth,
        },
      });
      cid = await client.add(artwork.image.buffer);
      metadataCid = await client.add(metadata);
    } catch (error) {
      this.logger.error('Error adding file to IPFS:', error);
      throw new Error('Failed to add file to IPFS');
    }

    const url = this.configService.get("NFT_MODULE_URL");

    const collectionID = await this.nftRepository.getUserCollectionID(userId)
    this.logger.log(collectionID);
    const response = await fetch(`${url}/collection/${collectionID}/asset`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "meta": {
          "name": artwork.name,
          "metadata": metadataCid.path,
          "image": cid.path,
          "author": address
        },
      })
    });
    return await response.json();
  }

  async updateNFTCall(artworkId: string, userId: string): Promise<string> {

    const artwork = await this.nftRepository.getArtwork(artworkId);
    const user = await this.nftRepository.getUser(userId);
    if (!user || !artwork) {
      return null
    }

    //check if user owns artwork
    const artworks = await this.adminRepository.getArtworks(userId);
    //check for matching artwork
    for (let i = 0; i < artworks.length; i++) {
      if (artworks[i].id == artworkId) {
        let cid = null
        let metadataCid = null

        try {
          const IPFS_NODE_URL = this.configService.get("IPFS_URL");
          const username = this.configService.get("IPFS_NAME");
          const password = this.configService.get("IPFS_PASSWORD");

          //Create metadata
          const metadata = JSON.stringify({
            description: artwork.description,
            artist: artwork.artist,
            year: artwork.year,
            artworkGenre: artwork.artworkGenre,
            artworkMaterial: artwork.artworkMaterial,
            artworkTechnique: artwork.artworkTechnique,
            artworkWorktype: artwork.artworkWorktype,
            measurements: artwork.measurements,
          });

          const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
          const client = create({
            url: IPFS_NODE_URL,
            headers: {
              authorization: auth,
            },
          });
          cid = await client.add(artwork.image.buffer);
          metadataCid = await client.add(metadata);
        } catch (error) {
          this.logger.error('Error adding file to IPFS:', error);
          throw new Error('Failed to add file to IPFS');
        }

        const url = this.configService.get("NFT_MODULE_URL");

        const colAndArtId = artwork.nft.nftData.id;

        const response = await fetch(`${url}/update/asset/${colAndArtId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "meta": {
              "name": artwork.name,
              "metadata": metadataCid.path,
              "image": cid.path,
            },
          })
        });
        return await response.json();
      }
    }
  }

  async updateNftInDB(artworkId: string, userId: string): Promise<void> {
    //TBA
  }
}