import React from 'react';

import { AdminType } from '@/app/admin/types';
import { Button, Col, Row } from 'react-bootstrap';
import AdminList from '../../components/list';
import { AdminGetData } from '../../functions/get.data';
import { M } from '..';
import AdminNftImage from '../../components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFileImport, faLink } from '@fortawesome/free-solid-svg-icons';
import AdminImage from '../../components/image';
import { AdminIcon } from '../../components/components';
import ConnectedWallets from './nft.wallets';

export async function List(admin: AdminType) {

   const nft = await AdminGetData("admin/nft");
   const wallet = await AdminGetData("admin/wallet");
   const user = await AdminGetData("admin/user");
   const collection = await AdminGetData("admin/collection");
   const artwork = await AdminGetData("admin/artwork");
   let trialNFT = await AdminGetData("admin/trialinfo/nft/" + user['trialMintId']);

   if (!trialNFT || trialNFT.statusCode == 404) {
      trialNFT = await AdminGetData("admin/nft/" + user['trialMintId']);
   }

   const object = {
      wallet,
      user,
      collection,
   };

   return (
      <>
         <h1 className='text-center mb-5'>
            <AdminIcon name="nft" size={48} className='me-3' />
            NFT
         </h1>

            <M.Nft.Connect />

         {wallet && wallet.length > 0 ? (
            <>
               <Button as="a" variant="primary" href="/admin/nft/show">
                  <FontAwesomeIcon icon={faFileImport} className="me-2" />
                  Show NFTs
               </Button>
            </>
         ) : null}

         <hr className='my-5' />

         {user['trialMintId'] ? (
            <>
               {trialNFT ? (
                  <M.Nft.Trialminted data={{ nft: trialNFT, paid: user['trialMintPaid'], claimed: user['trialMintClaimed'] }} />
               ) : null}
            </>
         ) : null}

         {nft ? (
            <>
               <h2>NFT Artworks</h2>
               <Row className='mb-5 g-4 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2'>
                  {nft.map((data: any, key: number) => (
                     data['artwork'] ? (
                        <Col key={key}>
                           <AdminImage src={`artwork/${data['artwork'].id}/thumbnail`} alt={data['name']} />
                           <div className="mt-3">
                              <a href={`/admin/artwork/detail/${data['artwork'].id}`} className="d-block text-truncate" style={{ maxWidth: '150px' }}>
                                 <AdminIcon name='artwork' size={24} className='me-1' />
                                 <strong>{data['artwork'].name}</strong>
                              </a>
                           </div>
                           <h5 className="text-truncate" style={{ maxWidth: '150px' }}>{data['nftData'].name}</h5>

                           <p className='mt-3'>
                              <Button as="a" variant="primary" href={`/admin/nft/detail/${data['id']}`} className='mt-2'>
                                 NFT detail
                                 <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                              </Button>
                           </p>
                        </Col>
                     ) : null
                  ))}
               </Row>
               <hr className='my-5' />
            </>
         ) : null}

         {artwork ? (
            <>
               <h2>Artworks to Mint NFT</h2>
               <Row className='mb-5 g-4 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2'>
                  {artwork.map((data: any, key: number) => (
                     data['nft'] ? null : (
                        <Col key={key}>
                           <AdminImage src={`artwork/${data['id']}/thumbnail`} alt={data['name']} />
                           <div className='mt-3'>
                              <a href={`/admin/artwork/detail/${data['id']}`} className="d-block text-truncate" style={{ maxWidth: '150px' }}>
                                 <AdminIcon name='artwork' size={24} className='me-1' />
                                 <strong>{data['name']}</strong>
                              </a>
                              <AdminIcon name='artist' size={24} className='me-1' />
                              <span className="d-block text-truncate" style={{ maxWidth: '150px' }}>{data['artist'].name}</span>
                              <M.Nft.Mint admin={admin} data={data} collection={collection} />
                           </div>
                        </Col>
                     )))}
               </Row>
            </>
         ) : null}
      </>
   );
}
