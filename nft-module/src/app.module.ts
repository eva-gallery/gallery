import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CollectionModule } from "./modules/collectionCreator/collection.module";
import { MetadataModule } from "./modules/nftMetadata/metadata.module";
import { NFTModule } from "./modules/nftMinter/nft.module";
import { SwapModule } from "./modules/ownershipSwap/swap.module";
import { ConfigModule } from "@nestjs/config";
import { swapCreator } from "@modules/ownershipSwap/swap.service";
import { metadataService } from "@modules/nftMetadata/metadata.service";
import { nftCreator } from "@modules/nftMinter/nft.service";
import { collectionCreator } from "@modules/collectionCreator/collection.service";
import { UpdaterCreator } from "@modules/nftUpdater/updater.service";
import { UpdateModule } from "@modules/nftUpdater/updater.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NFTModule,
    CollectionModule,
    MetadataModule,
    SwapModule,
    UpdateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    swapCreator,
    metadataService,
    nftCreator,
    collectionCreator,
    UpdaterCreator,
  ],
})
export class AppModule {}