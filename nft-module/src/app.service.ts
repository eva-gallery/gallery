import { Injectable } from "@nestjs/common";
import { swapCreator } from "@modules/ownershipSwap/swap.service";
import { SwapDto } from "@modules/ownershipSwap/dto/SwapDto";
import { Extrinsic } from "@polkadot/types/interfaces";
import { metadataService } from "@modules/nftMetadata/metadata.service";
import { nftCreator } from "@modules/nftMinter/nft.service";
import { NftDto } from "@modules/nftMinter/dto/NftDto";
import { CollectionDto } from "@modules/collectionCreator/dto/CollectionDto";
import { collectionCreator } from "@modules/collectionCreator/collection.service";

@Injectable()
export class AppService {
  constructor(
    private readonly swapCreator: swapCreator,
    private readonly metadataService: metadataService,
    private readonly nftCreator: nftCreator,
    private readonly collectionCreator: collectionCreator,
  ) {}

  async testCreateSwapCall(): Promise<Extrinsic> {
    const nft: SwapDto = {
      address: "13TrdLhMVLcwcEhMYLcqrkxAgq9M5gnK1LZKAF4VupVfQDUg",
    };
    const collectionID = 1;
    const assetID = 1;
    return await this.swapCreator.createSwapCall(collectionID, assetID, nft);
  }

  async testQueryMetadata(): Promise<string> {
    const address = "EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB";
    return await this.metadataService.getAccountNFTMetadata(address);
  }

  async testCreateNft(): Promise<Extrinsic> {
    const nft: NftDto = {
      meta: {
        name: "mockedName",
        metadata: "mockedDescription",
        image: "mockedIpfs",
        author: "13TrdLhMVLcwcEhMYLcqrkxAgq9M5gnK1LZKAF4VupVfQDUg",
      },
    };
    const collectionID = 1;
    return await this.nftCreator.createNFTcall(collectionID, nft);
  }

  async testCreateCol(): Promise<Extrinsic> {
    const collectionMeta = {
      name: "mockedName",
      metadata: "mockedDescription",
      image: "mockedIpfs",
    };
    const collectionDto: CollectionDto = {
      owner: "13TrdLhMVLcwcEhMYLcqrkxAgq9M5gnK1LZKAF4VupVfQDUg",
      meta: collectionMeta,
    };
    return await this.collectionCreator.createCollectionCall(collectionDto);
  }
}