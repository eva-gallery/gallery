
import React from 'react';

import { AdminType } from '@/app/admin/types';
import { Button, Col, Row } from 'react-bootstrap';
import AdminList from '../../components/list';
import { AdminGetData } from '../../functions/get.data';
import { M } from '..';
import { AdminNftImage } from '../../components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFileImport, faLink } from '@fortawesome/free-solid-svg-icons';
import AdminImage from '../../components/image';
import { AdminIcon } from '../../components/components';


export async function Show(admin: AdminType) {

   const wallet = await AdminGetData("admin/wallet");
   const options = await Promise.all([
      AdminGetData("admin/options/artist"),
      AdminGetData("admin/options/artwork_genre"),
      AdminGetData("admin/options/artwork_worktype"),
      AdminGetData("admin/options/artwork_material"),
      AdminGetData("admin/options/artwork_technique"),
      AdminGetData("admin/options/exhibition"),
   ]);

   const option = {
      artist: options[0],
      artwork_genre: options[1],
      artwork_worktype: options[2],
      artwork_material: options[3],
      artwork_technique: options[4],
      exhibition: options[5],
   };

   return (
      <>
         <h1 className='mb-3'>
            <AdminIcon name="nft" size={48} className='me-3' />
            Connected wallets: Collection and NFT list.
         </h1>

         <hr className='my-5' />
         {wallet && wallet.map((walletItem: any, walletKey: number) => (
            <React.Fragment key={walletKey}>
               <h4 className='mb-3'>
                  <AdminIcon name='wallet' size={32} className='me-2' />
                 Wallet: <code><em className='font-monospace'>{walletItem.walletAddress}</em></code>
               </h4>

               {walletItem.collections && walletItem.collections.map((collectionItem: any, collectionKey: number) => (
                  collectionItem.nfts && collectionItem.nfts.length > 0 && (
                     <React.Fragment key={collectionKey}> 
                        <h4 className='mb-3'>
                           <AdminIcon name='collection' size={32} className='me-2' />
                           Collection name: <code><em className='font-monospace'>{collectionItem.colData.name || 'null'}</em></code>, Collection id:  <code><em className='font-monospace'>{collectionItem.colData.id}</em></code>
                        </h4>
                        <Row className='mb-5 border p-3'>
                           <Col xs="auto">
                              <AdminNftImage src={collectionItem.colData.image} alt={collectionItem.colData.name} width={200} />
                           </Col> 
                           <Col>
                              <strong>Collection description: </strong>
                              {collectionItem.colData.description || 'null'}
                           </Col>
                        </Row>

                        <Row className='mb-5 g-4 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2'>
                           {collectionItem.nfts.map((data: any, nftKey: number) => (
                              !data.artwork && (
                                 <Col key={nftKey}>
                                    <AdminNftImage src={data.nftData?.image} alt={data.nftData?.name} width={100} height="auto" />

                                    <p>
                                       <strong>{data.nftData?.name}</strong>
                                       <br />
                                       {data.nftData?.description}
                                    </p>

                                    <p className='mt-3'>
                              <Button as="a" variant="primary" href={`/admin/nft/detail/${data['id']}`} className='mt-2'>
                                 NFT detail
                                 <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                              </Button>
                           </p>
                                 </Col>
                              )))}
                        </Row>
                        <hr className='my-5' />
                     </React.Fragment>
                  )
               ))}

               {walletItem.orphanNfts && walletItem.orphanNfts.length > 0 && (
                  <>
                     <h3 className='mb-4 text-primary'>
                        <FontAwesomeIcon icon={faFileImport} className='me-2' />
                        Orphan NFTs
                     </h3>
                     <p className='text-muted mb-4'>
                        Orphan NFTs are artworks that were minted and transferred to you by other wallets. 
                        You do not own the collections these NFTs are housed in and you cannot edit the NFT description.
                     </p>

                     <Row className='mb-5 g-4 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2'>
                        {walletItem.orphanNfts.map((data: any, orphanKey: number) => (
                           !data.artwork && (
                              <Col key={orphanKey}>
                                 <AdminNftImage src={data.nftData?.image} alt={data.nftData?.name} width={100} height="auto" />

                                 <p>
                                    <strong>{data.nftData?.name}</strong>
                                    <br />
                                    {data.nftData?.description}
                                 </p>
                                 <p className='mt-3'>
                                    <Button as="a" variant="primary" href={`/admin/nft/detail/${data['id']}`} className='mt-2'>
                                       NFT detail
                                       <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                                    </Button>
                                 </p>
                              </Col>
                           )))}
                     </Row>
                     <hr className='my-5' />
                  </>
               )}
            </React.Fragment>
         ))}
      </>
   );

}




